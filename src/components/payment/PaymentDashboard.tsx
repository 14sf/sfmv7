import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, CreditCard, Smartphone } from 'lucide-react';
import PaymentFlow from './PaymentFlow';
import RealEstatePayment from './modules/RealEstatePayment';

const PaymentDashboard = () => {
  const [activeModule, setActiveModule] = useState<'general' | 'real-estate'>('general');

  return (
    <div className="w-full py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SFMPay</h2>
          <p className="text-gray-600 dark:text-gray-400">Simple, secure, and flexible payments</p>
        </div>

        {/* Module Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModule('general')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeModule === 'general'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>General Payment</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModule('real-estate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeModule === 'real-estate'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Real Estate</span>
          </motion.button>
        </div>

        {/* Active Module */}
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {activeModule === 'general' ? <PaymentFlow /> : <RealEstatePayment />}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentDashboard;