import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../../types/book';
import TransactionItem from '../transactions/TransactionItem';

interface TransactionsListProps {
  selectedBook: Book | null;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ selectedBook }) => {
  if (!selectedBook?.transactions.length) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Transactions
      </h3>

      <div className="space-y-4">
        {selectedBook.transactions.map((transaction, index) => (
          <TransactionItem
            key={transaction.id}
            type={transaction.type}
            description={transaction.description}
            amount={transaction.amount}
            timestamp={new Date(transaction.timestamp).toLocaleDateString()}
            currency={selectedBook.currency}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;