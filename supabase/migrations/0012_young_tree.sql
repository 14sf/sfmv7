/*
  # SFM Wallet Integration

  1. New Tables
    - `sfm_wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `address` (text)
      - `created_at` (timestamptz)
      - `last_accessed` (timestamptz)
      
    - `sfm_wallet_balances`
      - `id` (uuid, primary key)
      - `wallet_id` (uuid, references sfm_wallets)
      - `currency` (text)
      - `amount` (numeric)
      - `value_usd` (numeric)
      - `updated_at` (timestamptz)

    - `sfm_wallet_transactions`
      - `id` (uuid, primary key) 
      - `wallet_id` (uuid, references sfm_wallets)
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

-- Create sfm_wallets table
CREATE TABLE sfm_wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  address text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_accessed timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create sfm_wallet_balances table
CREATE TABLE sfm_wallet_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES sfm_wallets(id) ON DELETE CASCADE NOT NULL,
  currency text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  value_usd numeric NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create sfm_wallet_transactions table
CREATE TABLE sfm_wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES sfm_wallets(id) ON DELETE CASCADE NOT NULL,
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
ALTER TABLE sfm_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sfm_wallet_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE sfm_wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own wallet"
  ON sfm_wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wallet"
  ON sfm_wallets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their wallet balances"
  ON sfm_wallet_balances
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sfm_wallets
      WHERE sfm_wallets.id = sfm_wallet_balances.wallet_id
      AND sfm_wallets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their wallet transactions"
  ON sfm_wallet_transactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sfm_wallets
      WHERE sfm_wallets.id = sfm_wallet_transactions.wallet_id
      AND sfm_wallets.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_sfm_wallets_user ON sfm_wallets(user_id);
CREATE INDEX idx_sfm_wallet_balances_wallet ON sfm_wallet_balances(wallet_id);
CREATE INDEX idx_sfm_wallet_transactions_wallet ON sfm_wallet_transactions(wallet_id);
CREATE INDEX idx_sfm_wallet_transactions_timestamp ON sfm_wallet_transactions(timestamp);

-- Add helper functions
CREATE OR REPLACE FUNCTION get_sfm_wallet_balance(wallet_id uuid, currency text)
RETURNS numeric
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT amount
  FROM sfm_wallet_balances
  WHERE sfm_wallet_balances.wallet_id = $1
  AND sfm_wallet_balances.currency = $2;
$$;