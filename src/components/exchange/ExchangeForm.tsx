import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useExchange } from '../../hooks/exchange/useExchange';
import { EAST_AFRICAN_CURRENCIES } from '../../types/payment/currencies';
import { SUPPORTED_PAIRS } from '../../types/exchange/rates';

const ExchangeForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState(EAST_AFRICAN_CURRENCIES[0].code);
  const { executeExchange, calculateExchangeAmount, isLoading } = useExchange();

  // Get the current exchange rate for the selected currency pair
  const currentRate = useMemo(() => {
    const pair = SUPPORTED_PAIRS.find(p => 
      (p.base === 'SFM' && p.quote === fromCurrency) ||
      (p.quote === 'SFM' && p.base === fromCurrency)
    );
    return pair?.rate || 0;
  }, [fromCurrency]);

  const estimatedAmount = useMemo(() => {
    if (amount <= 0) return 0;
    try {
      return calculateExchangeAmount(amount, 'SFM', fromCurrency);
    } catch {
      return 0;
    }
  }, [amount, fromCurrency, calculateExchangeAmount]);

  const handleExchange = async () => {
    if (amount <= 0 || isLoading) return;
    await executeExchange(amount, 'SFM', fromCurrency);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amount (SFM)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          To Currency
        </label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        >
          {EAST_AFRICAN_CURRENCIES.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.flag} {currency.name} ({currency.code})
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Exchange Rate</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              1 SFM = {currentRate.toFixed(4)} {fromCurrency}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>

        {amount > 0 && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Estimated: {estimatedAmount.toFixed(2)} {fromCurrency}
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleExchange}
        disabled={amount <= 0 || isLoading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? (
          'Processing...'
        ) : (
          <>
            <ArrowRight className="w-5 h-5" />
            Exchange Now
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ExchangeForm;