import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../../types/book';
import TransactionItem from './TransactionItem';
import { useTeamAccess } from '../../../hooks/useTeamAccess';

interface TransactionsListProps {
  book: Book;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ book }) => {
  const { canViewTransactions } = useTeamAccess(book);

  if (!canViewTransactions) {
    return null;
  }

  if (!book.transactions.length) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
        No transactions yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 dark:text-white flex items-center justify-between">
        Recent Transactions
        {book.transactions.length > 5 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
          >
            View All
          </motion.button>
        )}
      </h4>
      
      <div className="space-y-3">
        {book.transactions.slice(0, 5).map((transaction, index) => (
          <TransactionItem
            key={transaction.id}
            type={transaction.type}
            description={transaction.description}
            amount={transaction.amount}
            timestamp={new Date(transaction.timestamp).toLocaleString()}
            currency={book.currency}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;