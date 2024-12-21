import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { MaintenanceRequest } from '../../types/real-estate';

interface MaintenanceRequestListProps {
  requests: MaintenanceRequest[];
}

const MaintenanceRequestList: React.FC<MaintenanceRequestListProps> = ({ requests }) => {
  return (
    <div className="space-y-4">
      {requests.map((request, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-gray-900 dark:text-white">{request.issue}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{request.date}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MaintenanceRequestList;