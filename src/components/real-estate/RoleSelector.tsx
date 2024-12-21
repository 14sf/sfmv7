import React from 'react';
import { motion } from 'framer-motion';
import { Building, User, UserCog } from 'lucide-react';
import { RoleType } from '../../types/real-estate/roles';

interface RoleSelectorProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ currentRole, onRoleChange }) => {
  const roles: { type: RoleType; label: string; icon: any }[] = [
    { type: 'Owner', label: 'Property Owner', icon: Building },
    { type: 'Tenant', label: 'Tenant', icon: User },
    { type: 'Agent', label: 'Real Estate Agent', icon: UserCog }
  ];

  return (
    <div className="flex gap-4 mt-2">
      {roles.map(({ type, label, icon: Icon }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoleChange(type)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
            currentRole === type
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </motion.button>
      ))}
    </div>
  );
};

export default RoleSelector;