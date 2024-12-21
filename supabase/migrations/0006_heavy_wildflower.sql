/*
  # Add Document Management System

  1. New Tables
    - `property_documents` table for managing property-related files
      - Supports images, videos, invoices, contracts, receipts
      - Tracks file metadata (size, type, etc.)
      - Stores upload history
      
  2. Security
    - Enable RLS
    - Add policies for document access and management
    
  3. Features
    - File type validation
    - Size tracking
    - Upload history
    - Document categorization
*/

-- Create property_documents table with enhanced features
CREATE TABLE IF NOT EXISTS property_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('image', 'video', 'invoice', 'contract', 'receipt', 'other')),
  url text NOT NULL,
  size bigint NOT NULL,
  mime_type text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id) NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE property_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for property documents
CREATE POLICY "Property owners can view documents"
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

CREATE POLICY "Property owners can upload documents"
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

CREATE POLICY "Property owners can update documents"
  ON property_documents
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_documents.property_id
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Property owners can delete documents"
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_documents_property_id ON property_documents(property_id);
CREATE INDEX IF NOT EXISTS idx_property_documents_type ON property_documents(type);
CREATE INDEX IF NOT EXISTS idx_property_documents_uploaded_by ON property_documents(uploaded_by);

-- Add helper functions
CREATE OR REPLACE FUNCTION get_property_document_count(property_id uuid, document_type text DEFAULT NULL)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COUNT(*)
  FROM property_documents
  WHERE property_documents.property_id = $1
  AND ($2 IS NULL OR property_documents.type = $2);
$$;

-- Add trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_property_documents_updated_at
  BEFORE UPDATE ON property_documents
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();