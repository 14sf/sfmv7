/*
  # Real Estate Roles and Permissions System

  1. New Tables
    - `real_estate_roles` for managing user roles (owner, tenant, agent)
    - `property_assignments` for tracking property-user relationships
    - `agent_listings` for managing agent property listings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure property management permissions
    
  3. Features
    - Role-based access control
    - Property assignments tracking
    - Agent listing management
    - Automatic timestamps
*/

-- Create real estate roles enum type
CREATE TYPE real_estate_role AS ENUM ('owner', 'tenant', 'agent');

-- Create real estate roles table
CREATE TABLE real_estate_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  role real_estate_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create property assignments table
CREATE TABLE property_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  role real_estate_role NOT NULL,
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'expired')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(property_id, user_id, role)
);

-- Create agent listings table
CREATE TABLE agent_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  agent_id uuid REFERENCES auth.users(id) NOT NULL,
  listing_type text NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  commission_rate numeric NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'completed', 'cancelled')),
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(property_id, agent_id)
);

-- Enable RLS
ALTER TABLE real_estate_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for real_estate_roles
CREATE POLICY "Users can view their own roles"
  ON real_estate_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can manage roles"
  ON real_estate_roles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policies for property_assignments
CREATE POLICY "Users can view their property assignments"
  ON property_assignments
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_assignments.property_id
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Property owners can manage assignments"
  ON property_assignments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_assignments.property_id
      AND properties.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_assignments.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Create policies for agent_listings
CREATE POLICY "Users can view agent listings"
  ON agent_listings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Agents can manage their listings"
  ON agent_listings
  FOR ALL
  TO authenticated
  USING (
    agent_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = agent_listings.property_id
      AND properties.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    agent_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = agent_listings.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_real_estate_roles_user ON real_estate_roles(user_id);
CREATE INDEX idx_property_assignments_property ON property_assignments(property_id);
CREATE INDEX idx_property_assignments_user ON property_assignments(user_id);
CREATE INDEX idx_agent_listings_property ON agent_listings(property_id);
CREATE INDEX idx_agent_listings_agent ON agent_listings(agent_id);
CREATE INDEX idx_agent_listings_status ON agent_listings(status);

-- Add helper functions
CREATE OR REPLACE FUNCTION get_user_role(user_id uuid, property_id uuid)
RETURNS real_estate_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role
  FROM property_assignments
  WHERE property_assignments.user_id = $1
  AND property_assignments.property_id = $2
  AND property_assignments.status = 'active'
  AND (property_assignments.end_date IS NULL OR property_assignments.end_date > now())
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION is_property_agent(user_id uuid, property_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM agent_listings
    WHERE agent_listings.agent_id = $1
    AND agent_listings.property_id = $2
    AND agent_listings.status = 'active'
    AND (agent_listings.end_date IS NULL OR agent_listings.end_date > now())
  );
$$;

-- Add triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_real_estate_roles_updated_at
  BEFORE UPDATE ON real_estate_roles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_property_assignments_updated_at
  BEFORE UPDATE ON property_assignments
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_agent_listings_updated_at
  BEFORE UPDATE ON agent_listings
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();