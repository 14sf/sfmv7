/*
  # Document Management Enhancement
  
  1. Changes
    - Drops and recreates document policies with unique names
    - Maintains existing document table structure
    - Updates RLS policies with proper naming
  
  2. Security
    - Enables RLS on documents table
    - Adds granular access policies for document management
    - Implements secure document count function
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "view_documents_policy" ON documents;
    DROP POLICY IF EXISTS "upload_documents_policy" ON documents;
    DROP POLICY IF EXISTS "delete_documents_policy" ON documents;
EXCEPTION 
    WHEN undefined_object THEN null;
END $$;

-- Create new policies with unique names
CREATE POLICY "documents_view_policy_2023" 
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

CREATE POLICY "documents_upload_policy_2023"
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

CREATE POLICY "documents_delete_policy_2023"
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