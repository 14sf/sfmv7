import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import PropertyListItem from './PropertyListItem';
import { useProperties } from '../../../../hooks/real-estate/useProperties';

const PropertyList = () => {
  const { properties } = useProperties();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Properties
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Property
        </motion.button>
      </div>

      <div className="space-y-4">
        {properties.map((property, index) => (
          <PropertyListItem
            key={property.id}
            property={property}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;