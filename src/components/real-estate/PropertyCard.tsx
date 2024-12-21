import React from 'react';
import { motion } from 'framer-motion';
import { Building, DollarSign, User } from 'lucide-react';
import { Property } from '../../types/real-estate';
import { RolePermissions } from '../../types/real-estate/roles';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onRequestMaintenance: () => void;
  permissions: RolePermissions;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onRequestMaintenance,
  permissions
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(property)}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{property.address}</h3>
          <span className={`text-sm ${
            property.status === 'Available' 
              ? 'text-green-600 dark:text-green-400'
              : property.status === 'Rented'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {property.status}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Rent Price</span>
          <div className="flex items-center text-gray-900 dark:text-white">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{property.rentPrice.toLocaleString()} SFM</span>
          </div>
        </div>

        {property.salePrice && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sale Price</span>
            <div className="flex items-center text-gray-900 dark:text-white">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{property.salePrice.toLocaleString()} SFM</span>
            </div>
          </div>
        )}

        {property.tenantId && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tenant</span>
            <div className="flex items-center text-gray-900 dark:text-white">
              <User className="w-4 h-4 mr-1" />
              <span>Active</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Role-specific actions */}
      {permissions.canRequestMaintenance && property.status === 'Rented' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={(e) => {
            e.stopPropagation();
            onRequestMaintenance();
          }}
        >
          Request Maintenance
        </motion.button>
      )}
    </motion.div>
  );
};

export default PropertyCard;