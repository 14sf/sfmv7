import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../../types/book';
import { DollarSign } from 'lucide-react';

interface BookStatsProps {
  book: Book;
}

const BookStats: React.FC<BookStatsProps> = ({ book }) => {
  const stats = [
    {
      label: 'Total Balance',
      value: book.balance,
    },
    {
      label: 'Monthly Expenses',
      value: book.balance * 0.3,
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {stat.value.toLocaleString()} {book.currency}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default BookStats;