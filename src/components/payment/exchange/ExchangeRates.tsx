import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { EAST_AFRICAN_CURRENCIES } from '../../../types/payment/currencies';

const ExchangeRates = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Live Exchange Rates
      </h3>

      <div className="space-y-4">
        {EAST_AFRICAN_CURRENCIES.map((currency) => (
          <motion.div
            key={currency.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currency.flag}</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {currency.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currency.region}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {currency.exchangeRate.toFixed(4)}
                </span>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-green-600 dark:text-green-400"
                >
                  <TrendingUp className="w-4 h-4" />
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currency.code}/SFM
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRates;