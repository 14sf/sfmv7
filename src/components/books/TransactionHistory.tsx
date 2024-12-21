import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Book } from '../../types/book';

interface TransactionHistoryProps {
  selectedBook: Book | null;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ selectedBook }) => {
  if (!selectedBook) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Select a book to view transactions
        </p>
      </div>
    );
  }

  const transactions = [
    {
      id: '1',
      type: 'addition',
      description: 'Payment Received',
      amount: 1200,
      timestamp: new Date().toLocaleString()
    },
    {
      id: '2',
      type: 'subtraction',
      description: 'Server Costs',
      amount: 450,
      timestamp: 'Yesterday'
    },
    {
      id: '3',
      type: 'addition',
      description: 'New Client',
      amount: 2800,
      timestamp: '23 Mar'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Recent Transactions - {selectedBook.name}
      </h3>

      <div className="space-y-4">
        {transactions.map(transaction => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 ${
                transaction.type === 'addition' 
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-red-100 dark:bg-red-900'
              } rounded-lg`}>
                {transaction.type === 'addition' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {transaction.timestamp}
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium ${
              transaction.type === 'addition'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'addition' ? '+' : '-'}
              {transaction.amount} {selectedBook.currency}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TransactionHistory;