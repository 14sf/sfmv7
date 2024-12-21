/*
  # Create Wallet Tables

  1. New Tables
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `address` (text)
      - `created_at` (timestamptz)
      - `last_accessed` (timestamptz)
      
    - `wallet_balances`
      - `id` (uuid, primary key)
      - `wallet_id` (uuid, references wallets)
      - `currency` (text)
      - `amount` (numeric)
      - `value_usd` (numeric)
      - `updated_at` (timestamptz)

    - `wallet_transactions`
      - `id` (uuid, primary key) 
      - `wallet_id` (uuid, references wallets)
      - `type` (text)
      - `amount` (numeric)
      - `currency` (text)
      - `status` (text)
      - `from_address` (text)
      - `to_address` (text)
      - `fee` (numeric)
      - `timestamp` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for wallet access and management
*/

-- Create wallets table
CREATE TABLE wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  address text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_accessed timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create wallet_balances table
CREATE TABLE wallet_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE NOT NULL,
  currency text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  value_usd numeric NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create wallet_transactions table
CREATE TABLE wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('send', 'receive', 'swap', 'stake')),
  amount numeric NOT NULL,
  currency text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  from_address text,
  to_address text,
  fee numeric,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own wallet"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wallet"
  ON wallets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their wallet balances"
  ON wallet_balances
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wallets
      WHERE wallets.id = wallet_balances.wallet_id
      AND wallets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their wallet transactions"
  ON wallet_transactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wallets
      WHERE wallets.id = wallet_transactions.wallet_id
      AND wallets.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_wallets_user ON wallets(user_id);
CREATE INDEX idx_wallet_balances_wallet ON wallet_balances(wallet_id);
CREATE INDEX idx_wallet_transactions_wallet ON wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_transactions_timestamp ON wallet_transactions(timestamp);

-- Add helper functions
CREATE OR REPLACE FUNCTION get_wallet_balance(wallet_id uuid, currency text)
RETURNS numeric
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT amount
  FROM wallet_balances
  WHERE wallet_balances.wallet_id = $1
  AND wallet_balances.currency = $2;
$$;