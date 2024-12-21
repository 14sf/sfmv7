import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Plus, Upload, DollarSign } from 'lucide-react';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import { useToast } from '../../../hooks/useToast';
import { Property } from '../../../types/market';

const RealEstateManager = () => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const { showToast } = useToast();

  const handleAddProperty = (property: Omit<Property, 'id' | 'sellerId'>) => {
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      sellerId: '1', // In a real app, this would be the current user's ID
      createdAt: Date.now(),
      status: 'active' as const
    };
    setProperties([...properties, newProperty]);
    setShowPropertyForm(false);
    showToast('Property listed successfully!', 'success');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Real Estate Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              List and manage your properties
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPropertyForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Home, label: 'Listed Properties', value: properties.length },
          { icon: DollarSign, label: 'Total Value', value: `${properties.reduce((sum, p) => sum + p.price, 0).toLocaleString()} SFM` },
          { icon: Upload, label: 'Active Listings', value: properties.filter(p => p.status === 'active').length }
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Property List */}
      <PropertyList
        properties={properties}
        onDelete={(id) => {
          setProperties(properties.filter(p => p.id !== id));
          showToast('Property removed successfully', 'success');
        }}
      />

      {/* Add Property Form */}
      {showPropertyForm && (
        <PropertyForm
          onSubmit={handleAddProperty}
          onClose={() => setShowPropertyForm(false)}
        />
      )}
    </div>
  );
};

export default RealEstateManager;