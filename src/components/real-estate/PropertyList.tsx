import React from 'react';
import { Property } from '../../types/real-estate';
import { RolePermissions } from '../../types/real-estate/roles';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onRequestMaintenance: () => void;
  permissions: RolePermissions;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onSelectProperty,
  onRequestMaintenance,
  permissions
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.propertyId}
          property={property}
          onSelect={onSelectProperty}
          onRequestMaintenance={onRequestMaintenance}
          permissions={permissions}
        />
      ))}
    </div>
  );
};

export default PropertyList;