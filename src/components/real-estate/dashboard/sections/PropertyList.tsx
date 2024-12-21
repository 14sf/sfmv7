import React from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, DollarSign } from 'lucide-react';
import PropertyListItem from '../ui/PropertyListItem';

const PropertyList = () => {
  const properties = [
    {
      id: '1',
      title: 'Modern Apartment',
      location: 'Kigali, Rwanda',
      price: 1200,
      status: 'occupied',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3'
    },
    {
      id: '2',
      title: 'Luxury Villa',
      location: 'Kigali, Rwanda',
      price: 2500,
      status: 'available',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Properties
          </h2>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Property
        </button>
      </div>

      <div className="space-y-4">
        {properties.map((property, index) => (
          <PropertyListItem key={property.id} property={property} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;