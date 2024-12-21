import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { ExchangeTransaction } from '../../types/exchange';

interface ExchangeHistoryProps {
  transactions: ExchangeTransaction[];
}

const ExchangeHistory: React.FC<ExchangeHistoryProps> = ({ transactions }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Recent Exchanges
      </h3>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          No exchange history yet
        </p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {transaction.fromAmount.toFixed(2)} {transaction.fromCurrency}
                    </span>
                    <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {transaction.toAmount.toFixed(2)} {transaction.toCurrency}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Rate: 1 {transaction.fromCurrency} = {transaction.rate.toFixed(4)} {transaction.toCurrency}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExchangeHistory;