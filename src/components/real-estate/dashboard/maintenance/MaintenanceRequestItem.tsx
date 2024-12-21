import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { MaintenanceRequest } from '../../../../types/real-estate';
import { getPriorityColor, getStatusColor } from '../../../../utils/statusColors';

interface MaintenanceRequestItemProps {
  request: MaintenanceRequest;
  index: number;
}

const MaintenanceRequestItem: React.FC<MaintenanceRequestItemProps> = ({ request, index }) => {
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