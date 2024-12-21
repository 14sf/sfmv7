import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../../types/book';

interface TransactionHistoryProps {
  transactions?: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Recent Transactions
      </h3>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'addition'
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                {transaction.type === 'addition' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className={`font-medium ${
              transaction.type === 'addition'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'addition' ? '+' : '-'}
              {transaction.amount.toLocaleString()}
            </span>
          </motion.div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No transactions yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;