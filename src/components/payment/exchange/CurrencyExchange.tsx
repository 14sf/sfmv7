import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { Currency, EAST_AFRICAN_CURRENCIES } from '../../../types/payment/currencies';
import { useToast } from '../../../hooks/useToast';

const CurrencyExchange = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<Currency>(EAST_AFRICAN_CURRENCIES[0]);
  const { showToast } = useToast();

  const handleExchange = () => {
    const sfmAmount = amount / fromCurrency.exchangeRate;
    showToast(`Exchange initiated: ${amount} ${fromCurrency.code} ≈ ${sfmAmount.toFixed(2)} SFM`, 'success');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Currency Exchange
      </h3>

      <div className="space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full pl-4 pr-12 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {fromCurrency.symbol}
            </span>
          </div>
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <select
              value={fromCurrency.code}
              onChange={(e) => setFromCurrency(
                EAST_AFRICAN_CURRENCIES.find(c => c.code === e.target.value) || EAST_AFRICAN_CURRENCIES[0]
              )}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              {EAST_AFRICAN_CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700">
              <span>SFM Token</span>
            </div>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Exchange Rate</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                1 SFM = {fromCurrency.exchangeRate} {fromCurrency.code}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => showToast('Refreshing rates...', 'info')}
                className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400"
              >
                <RefreshCw className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Exchange Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExchange}
          disabled={amount <= 0}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-5 h-5" />
          Exchange Now
        </motion.button>
      </div>
    </div>
  );
};

export default CurrencyExchange;