import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookManager from './BookManager';
import BudgetOverview from './BudgetOverview';
import TransactionHistory from './TransactionHistory';
import { Book } from '../../types/book';

const BookDashboard = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-12 gap-6"
    >
      {/* Left Column - Book Management */}
      <div className="col-span-12 lg:col-span-8">
        <BookManager
          selectedBook={selectedBook}
          onSelectBook={setSelectedBook}
        />
      </div>

      {/* Right Column - Budget & Transactions */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <BudgetOverview selectedBook={selectedBook} />
        <TransactionHistory selectedBook={selectedBook} />
      </div>
    </motion.div>
  );
};

export default BookDashboard;