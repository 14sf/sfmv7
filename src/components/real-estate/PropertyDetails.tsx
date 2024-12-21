import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, DollarSign, User, FileText, Tool } from 'lucide-react';
import { Property } from '../../types/real-estate';
import { Document } from '../../types/real-estate/documents';
import DocumentManager from './documents/DocumentManager';
import MaintenanceRequestList from './MaintenanceRequestList';
import { useToast } from '../../hooks/useToast';

interface PropertyDetailsProps {
  property: Property;
  onUpdateProperty: (property: Property) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onUpdateProperty
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'documents' | 'maintenance'>('details');
  const { showToast } = useToast();

  const handleDocumentUpload = async (doc: Omit<Document, 'id' | 'url'>) => {
    try {
      // In a real app, this would upload to a server
      showToast('Document uploaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to upload document', 'error');
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: Building },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'maintenance', label: 'Maintenance', icon: Tool }
  ] as const;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {property.address}
            </h3>
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
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 ${
              activeTab === id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Rent Price
                </label>
                <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-1" />
                  {property.rentPrice.toLocaleString()} SFM/mo
                </div>
              </div>

              {property.salePrice && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Sale Price
                  </label>
                  <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                    <DollarSign className="w-5 h-5 text-gray-400 mr-1" />
                    {property.salePrice.toLocaleString()} SFM
                  </div>
                </div>
              )}
            </div>

            {property.tenantId && (
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Current Tenant
                </label>
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>Active Tenant</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <DocumentManager
            propertyId={property.propertyId}
            onUpload={handleDocumentUpload}
          />
        )}

        {activeTab === 'maintenance' && (
          <MaintenanceRequestList
            requests={property.maintenanceRequests}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;