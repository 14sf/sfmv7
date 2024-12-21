import React from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, Users, Tool } from 'lucide-react';

const PropertyStats = () => {
  const stats = [
    {
      icon: Home,
      label: 'Total Properties',
      value: '12',
      change: '+2',
      changeType: 'increase'
    },
    {
      icon: DollarSign,
      label: 'Monthly Revenue',
      value: '24,500 SFM',
      change: '+5.2%',
      changeType: 'increase'
    },
    {
      icon: Users,
      label: 'Active Tenants',
      value: '18',
      change: '+3',
      changeType: 'increase'
    },
    {
      icon: Tool,
      label: 'Maintenance Requests',
      value: '5',
      change: '-2',
      changeType: 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`text-sm ${
                stat.changeType === 'increase' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PropertyStats;