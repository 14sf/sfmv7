import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Trash2, Edit2 } from 'lucide-react';
import { Property } from '../../../types/market';
import SFMPayButton from '../../payment/SFMPayButton';

interface PropertyListProps {
  properties: Property[];
  onDelete: (id: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm"
        >
          <div className="relative h-48">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
              For {property.type === 'sale' ? 'Sale' : 'Rent'}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {property.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {property.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location || 'Kigali, Rwanda'}</span>
              </div>
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <DollarSign className="w-5 h-5 mr-1" />
                <span className="font-bold">
                  {property.price.toLocaleString()} SFM
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <SFMPayButton amount={property.price} />
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 p-2 text-blue-600 hover:bg-blue-50 border-2 border-blue-200 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onDelete(property.id)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 border-2 border-red-200 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Remove</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyList;