import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Plus } from 'lucide-react';
import { Property } from '../../types/real-estate';
import { RoleType } from '../../types/real-estate/roles';
import { useToast } from '../../hooks/useToast';
import RoleSelector from '../real-estate/RoleSelector';
import AddPropertyForm from '../real-estate/forms/AddPropertyForm';
import MaintenanceRequestForm from '../real-estate/forms/MaintenanceRequestForm';
import PropertyList from '../real-estate/PropertyList';

const SFMRealEstate: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<RoleType>('Owner');
  const { showToast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([
    {
      propertyId: '1',
      address: '123 Kigali Street',
      rentPrice: 1000,
      salePrice: 50000,
      ownerId: '1',
      status: 'Available',
      maintenanceRequests: []
    },
    {
      propertyId: '2',
      address: '456 Rwanda Avenue',
      rentPrice: 800,
      ownerId: '1',
      status: 'Rented',
      tenantId: '2',
      maintenanceRequests: []
    }
  ]);

  const handleSelectProperty = (property: Property) => {
    setSelectedPropertyId(property.propertyId);
  };

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

  const handleMaintenanceRequest = ({ issue, propertyId }: { issue: string; propertyId: string }) => {
    setProperties(properties.map(property => {
      if (property.propertyId === propertyId) {
        return {
          ...property,
          maintenanceRequests: [
            ...property.maintenanceRequests,
            { issue, date: new Date().toLocaleDateString() }
          ]
        };
      }
      return property;
    }));
    setShowMaintenanceForm(false);
    showToast('Maintenance request submitted successfully!', 'success');
  };

  const permissions = {
    canAddProperty: currentRole === 'Owner',
    canEditProperty: currentRole === 'Owner' || currentRole === 'Agent',
    canDeleteProperty: currentRole === 'Owner',
    canViewProperties: true,
    canAssignTenant: currentRole === 'Agent',
    canRequestMaintenance: currentRole === 'Tenant',
    canManageRequests: currentRole === 'Owner' || currentRole === 'Agent'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Real Estate Properties
            </h2>
            <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />
          </div>
        </div>

        {permissions.canAddProperty && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </motion.button>
        )}
      </div>

      <PropertyList
        properties={properties}
        onSelectProperty={handleSelectProperty}
        permissions={permissions}
        onRequestMaintenance={() => setShowMaintenanceForm(true)}
      />

      {showAddForm && (
        <AddPropertyForm
          onSubmit={handleAddProperty}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showMaintenanceForm && selectedPropertyId && (
        <MaintenanceRequestForm
          propertyId={selectedPropertyId}
          onSubmit={handleMaintenanceRequest}
          onClose={() => setShowMaintenanceForm(false)}
        />
      )}
    </div>
  );
};

export default SFMRealEstate;