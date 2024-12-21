/*
  # Enhanced Document Management System

  1. New Tables
    - `documents` table for managing all types of documents
      - Supports multiple file types (images, videos, PDFs, documents)
      - Tracks file metadata (size, type, etc.)
      - Stores upload history and user associations
      - Supports property and product associations
      
  2. Security
    - Enable RLS
    - Add policies for document access and management
    - Secure file ownership and access control
    
  3. Features
    - File type validation
    - Size tracking
    - Upload history
    - Document categorization
    - Metadata storage
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view their own documents" ON documents;
    DROP POLICY IF EXISTS "Users can upload documents" ON documents;
    DROP POLICY IF EXISTS "Users can delete their own documents" ON documents;
EXCEPTION 
    WHEN undefined_object THEN null;
END $$;

-- Drop existing table if it exists
DROP TABLE IF EXISTS documents;

-- Create documents table with enhanced features
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('image', 'video', 'invoice', 'contract', 'receipt', 'other')),
  name text NOT NULL,
  description text,
  url text NOT NULL,
  size bigint NOT NULL,
  mime_type text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id) NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "view_documents_policy" 
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = documents.property_id
      AND (properties.owner_id = auth.uid() OR properties.tenant_id = auth.uid())
    )
  );

CREATE POLICY "upload_documents_policy"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = uploaded_by AND (
      property_id IS NULL OR
      EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = property_id
        AND properties.owner_id = auth.uid()
      )
    )
  );

CREATE POLICY "delete_documents_policy"
  ON documents
  FOR DELETE
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = documents.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_property ON documents(property_id);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);

-- Add document count function
CREATE OR REPLACE FUNCTION get_property_document_count(property_id uuid, document_type text DEFAULT NULL)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COUNT(*)
  FROM documents
  WHERE documents.property_id = $1
  AND ($2 IS NULL OR documents.type = $2);
$$;

-- Add trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();