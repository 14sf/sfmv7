import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import MaintenanceRequestItem from './MaintenanceRequestItem';
import { useMaintenanceRequests } from '../../../../hooks/real-estate/useMaintenanceRequests';

const MaintenanceRequests = () => {
  const { requests } = useMaintenanceRequests();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Maintenance
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request, index) => (
          <MaintenanceRequestItem
            key={request.id}
            request={request}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MaintenanceRequests;