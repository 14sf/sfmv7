import React from 'react';
import { motion } from 'framer-motion';
import { Building, FileText, Tool, UserCog, Plus, Upload } from 'lucide-react';
import { RolePermissions } from '../../types/real-estate/roles';

interface PropertyActionsProps {
  onAddProperty: () => void;
  onUploadDocument: () => void;
  onRequestMaintenance: () => void;
  onManageAccess: () => void;
  permissions: RolePermissions;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({
  onAddProperty,
  onUploadDocument,
  onRequestMaintenance,
  onManageAccess,
  permissions
}) => {
  const actions = [
    {
      id: 'add-property',
      label: 'Add Property',
      icon: Plus,
      onClick: onAddProperty,
      show: permissions.canAddProperty,
      color: 'blue'
    },
    {
      id: 'upload-document',
      label: 'Upload Document',
      icon: Upload,
      onClick: onUploadDocument,
      show: permissions.canEditProperty,
      color: 'green'
    },
    {
      id: 'maintenance',
      label: 'Request Maintenance',
      icon: Tool,
      onClick: onRequestMaintenance,
      show: permissions.canRequestMaintenance,
      color: 'orange'
    },
    {
      id: 'manage-access',
      label: 'Manage Access',
      icon: UserCog,
      onClick: onManageAccess,
      show: permissions.canManageRequests,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.filter(action => action.show).map(({ id, label, icon: Icon, onClick, color }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 hover:bg-${color}-100 dark:hover:bg-${color}-900/30`}
        >
          <Icon className="w-6 h-6" />
          <span className="text-sm font-medium text-center">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default PropertyActions;