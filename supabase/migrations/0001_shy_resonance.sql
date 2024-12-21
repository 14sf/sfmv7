/*
  # Create Properties Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `address` (text)
      - `rent_price` (numeric)
      - `sale_price` (numeric, nullable)
      - `owner_id` (uuid, references auth.users)
      - `tenant_id` (uuid, references auth.users, nullable)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `properties` table
    - Add policies for CRUD operations
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text NOT NULL,
  rent_price numeric NOT NULL,
  sale_price numeric,
  owner_id uuid REFERENCES auth.users(id) NOT NULL,
  tenant_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'Available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);