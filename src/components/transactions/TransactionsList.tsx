import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Book } from '../../types/book';

interface TransactionsListProps {
  book: Book;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ book }) => {
  if (!book.transactions.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No transactions yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {book.transactions.map((transaction, index) => (
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
    </div>
  );
};

export default TransactionsList;