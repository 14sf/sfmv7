import React from 'react';
import { motion } from 'framer-motion';
import { Store, Search } from 'lucide-react';

const MarketHeader = () => {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">SF Market</h2>
      </motion.div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Your one-stop marketplace for real estate, automotive, services, and tourism
      </p>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, services, or locations..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;