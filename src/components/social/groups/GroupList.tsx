```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Group } from '../../../types/social';
import { Users } from 'lucide-react';

interface GroupListProps {
  groups: Group[];
  isLoading: boolean;
}

const GroupList: React.FC<GroupListProps> = ({ groups, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {groups.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="relative h-32">
            {group.avatar ? (
              <img
                src={group.avatar}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Users className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {group.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {group.description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {group.members.length} members
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Join Group
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      {groups.length === 0 && (
        <p className="text-center col-span-2 py-8 text-gray-500 dark:text-gray-400">
          No groups available
        </p>
      )}
    </div>
  );
};

export default GroupList;
```