import React from 'react';
import { Zap, Droplet, Wifi } from 'lucide-react';

const UtilityPayment = () => {
  const utilities = [
    { id: 'electricity', name: 'Electricity', icon: Zap },
    { id: 'water', name: 'Water', icon: Droplet },
    { id: 'internet', name: 'Internet', icon: Wifi }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Utility Payments</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {utilities.map((utility) => (
            <button
              key={utility.id}
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <utility.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">{utility.name}</h4>
            </button>
          ))}
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account/Meter Number
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              placeholder="Enter your account number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Amount
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 pl-12 dark:bg-gray-700"
                placeholder="0.00"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                SFM
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Transaction Fee</span>
            <span className="font-medium text-gray-900 dark:text-white">3 SFM</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UtilityPayment;