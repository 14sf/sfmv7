import React from 'react';
import { motion } from 'framer-motion';
import PropertyStats from './stats/PropertyStats';
import PropertyList from './properties/PropertyList';
import PaymentOverview from './payments/PaymentOverview';
import MaintenanceRequests from './maintenance/MaintenanceRequests';

const RealEstateDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <PropertyStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PropertyList />
            </div>
            <div className="space-y-6">
              <PaymentOverview />
              <MaintenanceRequests />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RealEstateDashboard;