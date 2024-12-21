import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Edit3, Eye } from 'lucide-react';

interface TeamGroup {
  id: string;
  name: string;
}

interface TeamGroupSelectorProps {
  groups: TeamGroup[];
  selectedGroup: string | null;
  onSelectGroup: (groupId: string | null) => void;
}

const TeamGroupSelector: React.FC<TeamGroupSelectorProps> = ({
  groups,
  selectedGroup,
  onSelectGroup
}) => {
  const getGroupIcon = (groupId: string) => {
    switch (groupId) {
      case 'admin':
        return Shield;
      case 'editor':
        return Edit3;
      case 'viewer':
        return Eye;
      default:
        return Users;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {groups.map(group => {
        const Icon = getGroupIcon(group.id);
        const isSelected = selectedGroup === group.id;

        return (
          <motion.button
            key={group.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGroup(isSelected ? null : group.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              isSelected 
                ? 'bg-blue-100 dark:bg-blue-900' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <Icon className={`w-5 h-5 ${
                isSelected
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`} />
            </div>
            <span className={`text-sm font-medium ${
              isSelected
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {group.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TeamGroupSelector;