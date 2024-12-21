/*
  # Create Property Documents Schema

  1. New Tables
    - `property_documents`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `name` (text)
      - `type` (text)
      - `url` (text)
      - `size` (bigint)
      - `mime_type` (text)
      - `uploaded_by` (uuid, references auth.users)
      - `uploaded_at` (timestamptz)
      - `metadata` (jsonb)

  2. Security
    - Enable RLS on `property_documents` table
    - Add policies for CRUD operations
*/

-- Create property_documents table
CREATE TABLE IF NOT EXISTS property_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  size bigint NOT NULL,
  mime_type text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id) NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE property_documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view documents for their properties"
  ON property_documents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_documents.property_id
      AND (properties.owner_id = auth.uid() OR properties.tenant_id = auth.uid())
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