import React, { useState } from 'react';
import { LineChart, PieChart, Wallet, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../../types/book';
import BookManager from '../books/BookManager';
import BudgetOverview from './BudgetOverview';
import TransactionHistory from './TransactionHistory';
import TeamManager from '../team/TeamManager';
import { useToast } from '../../hooks/useToast';

const SfmBookDashboard = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { showToast } = useToast();

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    showToast(`Selected book: ${book.name}`, 'info');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-green-600 dark:text-green-400 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +2.5%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">24,500 SFM</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Wallet className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-red-600 dark:text-red-400 flex items-center text-sm">
                <ArrowDownRight className="h-4 w-4 mr-1" /> -1.2%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Monthly Expenses</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">8,900 SFM</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-blue-600 dark:text-blue-400 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +3.1%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Active Books</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">5</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <LineChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-purple-600 dark:text-purple-400 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +5.8%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Team Members</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">12</p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Book Management */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BookManager
                selectedBook={selectedBook}
                onSelectBook={handleBookSelect}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <BudgetOverview selectedBook={selectedBook} />
            </motion.div>
          </div>

          {/* Right Column - Team and Transactions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TeamManager selectedBook={selectedBook} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <TransactionHistory selectedBook={selectedBook} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SfmBookDashboard;