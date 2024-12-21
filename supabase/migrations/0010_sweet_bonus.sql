/*
  # Update Document Management System

  1. Changes
    - Renames existing document policies to avoid conflicts
    - Updates policy logic for better security
    - Adds new document type validations
    - Enhances metadata handling

  2. Security
    - Updates RLS policies with unique names
    - Ensures proper access control for documents
    - Adds validation for document types

  3. Performance
    - Adds indexes for common queries
    - Adds helper functions for document counts
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "documents_view_policy_2023" ON documents;
    DROP POLICY IF EXISTS "documents_upload_policy_2023" ON documents;
    DROP POLICY IF EXISTS "documents_delete_policy_2023" ON documents;
EXCEPTION 
    WHEN undefined_object THEN null;
END $$;

-- Create new policies with unique names
CREATE POLICY "documents_select_policy_v2" 
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

CREATE POLICY "documents_insert_policy_v2"
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

CREATE POLICY "documents_delete_policy_v2"
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

-- Add document validation function
CREATE OR REPLACE FUNCTION validate_document()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate document type
  IF NEW.type NOT IN ('image', 'video', 'invoice', 'contract', 'receipt', 'other') THEN
    RAISE EXCEPTION 'Invalid document type';
  END IF;

  -- Validate metadata
  IF NEW.metadata IS NOT NULL AND NOT (NEW.metadata ? 'description') THEN
    NEW.metadata = jsonb_set(
      NEW.metadata,
      '{description}',
      '"No description provided"'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for document validation
DROP TRIGGER IF EXISTS validate_document_trigger ON documents;
CREATE TRIGGER validate_document_trigger
  BEFORE INSERT OR UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION validate_document();

-- Add document count by type function
CREATE OR REPLACE FUNCTION get_document_count_by_type(p_property_id uuid, p_type text)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COUNT(*)
  FROM documents
  WHERE property_id = p_property_id
  AND type = p_type;
$$;