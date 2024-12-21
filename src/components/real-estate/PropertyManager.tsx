import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Plus, FileText } from 'lucide-react';
import { Property } from '../../types/real-estate';
import { Document } from '../../types/real-estate/documents';
import PropertyList from './PropertyList';
import DocumentManager from './documents/DocumentManager';
import AddPropertyForm from './forms/AddPropertyForm';
import PropertyActions from './PropertyActions';
import { useToast } from '../../hooks/useToast';
import { ROLE_PERMISSIONS } from '../../types/real-estate/roles';

const PropertyManager: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { showToast } = useToast();

  // Using Owner permissions for demonstration
  const permissions = ROLE_PERMISSIONS.Owner;

  const handleAddProperty = (propertyData: Omit<Property, 'propertyId' | 'maintenanceRequests'>) => {
    const newProperty: Property = {
      ...propertyData,
      propertyId: Date.now().toString(),
      maintenanceRequests: []
    };
    setProperties([...properties, newProperty]);
    setShowAddForm(false);
    showToast('Property added successfully!', 'success');
  };

  const handleDocumentUpload = async (propertyId: string, document: Omit<Document, 'id' | 'url'>) => {
    try {
      // In a real app, this would upload to a server
      showToast('Document uploaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to upload document', 'error');
    }
  };

  const handleMaintenanceRequest = () => {
    if (!selectedProperty) return;
    showToast('Maintenance request submitted', 'success');
  };

  const handleManageAccess = () => {
    if (!selectedProperty) return;
    showToast('Access management opened', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Property Management
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your properties and documents
            </p>
          </div>
        </div>
      </div>

      {/* Property Actions */}
      <PropertyActions
        onAddProperty={() => setShowAddForm(true)}
        onUploadDocument={() => selectedProperty && handleDocumentUpload(selectedProperty.propertyId, {} as any)}
        onRequestMaintenance={handleMaintenanceRequest}
        onManageAccess={handleManageAccess}
        permissions={permissions}
      />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Properties List */}
        <div className="lg:col-span-2">
          <PropertyList
            properties={properties}
            onSelectProperty={setSelectedProperty}
            permissions={permissions}
            onRequestMaintenance={handleMaintenanceRequest}
          />
        </div>

        {/* Document Management */}
        <div>
          {selectedProperty ? (
            <DocumentManager
              propertyId={selectedProperty.propertyId}
              onUpload={(doc) => handleDocumentUpload(selectedProperty.propertyId, doc)}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Select a property to manage documents
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Property Form Modal */}
      {showAddForm && (
        <AddPropertyForm
          onSubmit={handleAddProperty}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default PropertyManager;