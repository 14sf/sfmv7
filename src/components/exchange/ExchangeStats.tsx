import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const ExchangeStats = () => {
  const stats = [
    {
      label: '24h Volume',
      value: '1.2M SFM',
      change: '+5.2%',
      isPositive: true
    },
    {
      label: 'Exchange Rate',
      value: '1,430.59 RWF',
      change: '-0.8%',
      isPositive: false
    },
    {
      label: 'Active Users',
      value: '2.5K',
      change: '+12.3%',
      isPositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div className={`flex items-center ${
              stat.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm">{stat.change}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            {stat.value}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ExchangeStats;