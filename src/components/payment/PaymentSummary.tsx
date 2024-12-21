import React from 'react';
import { motion } from 'framer-motion';
import { usePaymentSummary } from '../../hooks/usePaymentSummary';

const PaymentSummary: React.FC = () => {
  const { amount, fees, total } = usePaymentSummary();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Payment Summary
      </h3>
      
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
      </div>
    </div>
  );
};

export default PaymentSummary;