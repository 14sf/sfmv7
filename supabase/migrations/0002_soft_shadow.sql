/*
  # Create Maintenance Requests Schema

  1. New Tables
    - `maintenance_requests`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `issue` (text)
      - `status` (text)
      - `priority` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `maintenance_requests` table
    - Add policies for CRUD operations
*/

-- Create maintenance_requests table
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) NOT NULL,
  issue text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  created_by uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view maintenance requests for their properties"
  ON maintenance_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = maintenance_requests.property_id
      AND (properties.owner_id = auth.uid() OR properties.tenant_id = auth.uid())
    )
  );

CREATE POLICY "Tenants can create maintenance requests"
  ON maintenance_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = maintenance_requests.property_id
      AND properties.tenant_id = auth.uid()
    )
  );

CREATE POLICY "Owners can update maintenance requests"
  ON maintenance_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = maintenance_requests.property_id
      AND properties.owner_id = auth.uid()
    )
  );