import React from 'react';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../../types/book';

interface BookBalanceProps {
  book: Book;
}

const BookBalance: React.FC<BookBalanceProps> = ({ book }) => {
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(balance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Balance</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatBalance(book.balance)} <span className="text-sm">SFM</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {book.transactions.length} transactions
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Last updated: {new Date(book.transactions[book.transactions.length - 1]?.timestamp || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BookBalance;