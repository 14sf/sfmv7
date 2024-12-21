/*
  # Add Document Management System

  1. New Tables
    - `products` table for marketplace items
    - `documents` table for file management
    
  2. Security
    - Enable RLS
    - Add policies for document access
*/

-- Create products table first
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text NOT NULL,
  image text,
  seller_id uuid REFERENCES auth.users(id) NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create products policies
CREATE POLICY "Users can view all products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = seller_id);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('image', 'video', 'invoice', 'contract', 'receipt', 'other')),
  name text NOT NULL,
  url text NOT NULL,
  size bigint NOT NULL,
  mime_type text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id) NOT NULL,
  property_id uuid REFERENCES properties(id),
  product_id uuid REFERENCES products(id),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create document policies
CREATE POLICY "Users can view their own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = documents.property_id
      AND (properties.owner_id = auth.uid() OR properties.tenant_id = auth.uid())
    ) OR
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = documents.product_id
      AND products.seller_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = uploaded_by AND (
      -- Allow if no property/product ID (personal document)
      (property_id IS NULL AND product_id IS NULL) OR
      -- Allow if user owns the property
      EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = property_id
        AND properties.owner_id = auth.uid()
      ) OR
      -- Allow if user owns the product
      EXISTS (
        SELECT 1 FROM products
        WHERE products.id = product_id
        AND products.seller_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can delete their own documents"
  ON documents
  FOR DELETE
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = documents.property_id
      AND properties.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = documents.product_id
      AND products.seller_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_documents_property ON documents(property_id);
CREATE INDEX IF NOT EXISTS idx_documents_product ON documents(product_id);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);

-- Add document count functions
CREATE OR REPLACE FUNCTION get_property_document_count(property_id uuid)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COUNT(*)
  FROM documents
  WHERE documents.property_id = $1;
$$;

CREATE OR REPLACE FUNCTION get_product_document_count(product_id uuid)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COUNT(*)
  FROM documents
  WHERE documents.product_id = $1;
$$;