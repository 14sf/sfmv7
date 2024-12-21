import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface MaintenanceRequestItemProps {
  request: {
    id: string;
    title: string;
    property: string;
    status: string;
    priority: string;
    createdAt: string;
  };
  index: number;
}

const MaintenanceRequestItem: React.FC<MaintenanceRequestItemProps> = ({ request, index }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-green-600 dark:text-green-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {request.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {request.property}
      </p>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${getPriorityColor(request.priority)}`}>
          {request.priority} priority
        </span>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3 mr-1" />
          <span className="text-xs">{request.createdAt}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MaintenanceRequestItem;