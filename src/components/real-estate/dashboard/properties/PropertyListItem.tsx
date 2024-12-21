import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign } from 'lucide-react';
import { Property } from '../../../../types/real-estate';

interface PropertyListItemProps {
  property: Property;
  index: number;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({ property, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
    >
      <img
        src={property.image}
        alt={property.title}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {property.title}
        </h3>
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.price} SFM/mo</span>
          </div>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        property.status === 'occupied'
          ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
      }`}>
        {property.status}
      </span>
    </motion.div>
  );
};

export default PropertyListItem;