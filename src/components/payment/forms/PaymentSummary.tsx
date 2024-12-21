import React from 'react';
import { motion } from 'framer-motion';
import { usePaymentSummary } from '../../../hooks/usePaymentSummary';

const PaymentSummary = () => {
  const { amount, fees, total } = usePaymentSummary();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Payment Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Amount</span>
          <span className="font-medium text-gray-900 dark:text-white">{amount} SFM</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Transaction Fee</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {amount === 'SFM' ? '0.002' : '3'} SFM
          </span>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="font-medium text-gray-900 dark:text-white">Total</span>
            <span className="font-bold text-gray-900 dark:text-white">{total} SFM</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-6"
        >
          Confirm Payment
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentSummary;