/*
  # Real Estate Management Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `type` (text) - sale/rent
      - `status` (text) - available/occupied/maintenance
      - `owner_id` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `property_documents`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `name` (text)
      - `url` (text)
      - `type` (text)
      - `uploaded_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
    
    - `maintenance_requests`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `title` (text)
      - `description` (text)
      - `status` (text) - pending/in-progress/completed
      - `priority` (text) - high/medium/low
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for property owners and tenants
*/

-- Drop existing policies if they exist
DO $$ BEGIN
  -- Properties policies
  DROP POLICY IF EXISTS "Users can view all properties" ON properties;
  DROP POLICY IF EXISTS "Users can create their own properties" ON properties;
  DROP POLICY IF EXISTS "Owners can update their properties" ON properties;
  DROP POLICY IF EXISTS "Owners can delete their properties" ON properties;
  
  -- Document policies
  DROP POLICY IF EXISTS "Users can view property documents" ON property_documents;
  DROP POLICY IF EXISTS "Owners can upload documents" ON property_documents;
  DROP POLICY IF EXISTS "Owners can delete documents" ON property_documents;
  
  -- Maintenance request policies
  DROP POLICY IF EXISTS "Users can view maintenance requests for their properties" ON maintenance_requests;
  DROP POLICY IF EXISTS "Users can create maintenance requests" ON maintenance_requests;
  DROP POLICY IF EXISTS "Owners can update maintenance requests" ON maintenance_requests;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('sale', 'rent')),
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance')),
  owner_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Property Documents Table
CREATE TABLE IF NOT EXISTS property_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL CHECK (type IN ('image', 'video', 'document', 'contract')),
  uploaded_by uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Maintenance Requests Table
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  created_by uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;

-- Property Policies
CREATE POLICY "Users can view all properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Document Policies
CREATE POLICY "Users can view property documents"
  ON property_documents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_documents.property_id
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Owners can upload documents"
  ON property_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_documents.property_id
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Owners can delete documents"
  ON property_documents
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_documents.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Maintenance Request Policies
CREATE POLICY "Users can view maintenance requests for their properties"
  ON maintenance_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = maintenance_requests.property_id
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create maintenance requests"
  ON maintenance_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = maintenance_requests.property_id
      AND (properties.owner_id = auth.uid() OR status = 'occupied')
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_owner ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_property_documents_property ON property_documents(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_property ON maintenance_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_status ON maintenance_requests(status);