import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const Groups: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Groups Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Create or join a group to get started!
        </p>
      </motion.div>
    </div>
  );
};

export default Groups;