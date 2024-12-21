import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp } from 'lucide-react';
import { usePayments } from '../../../../hooks/real-estate/usePayments';

const PaymentOverview = () => {
  const { monthlyRevenue, pendingPayments, overduePayments } = usePayments();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment Overview
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">24,500 SFM</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">3,200 SFM</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">800 SFM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;