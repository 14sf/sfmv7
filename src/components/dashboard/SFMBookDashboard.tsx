import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, DollarSign, FileText } from 'lucide-react';
import BookManager from '../books/BookManager';
import TeamManagement from '../team/TeamManagement';
import TransactionHistory from './TransactionHistory';
import DocumentManager from './DocumentManager';

const SFMBookDashboard = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'team' | 'transactions' | 'documents'>('books');

  const tabs = [
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'books':
        return <BookManager />;
      case 'team':
        return <TeamManagement />;
      case 'transactions':
        return <TransactionHistory />;
      case 'documents':
        return <DocumentManager />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            SFMBook Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your books, team, and transactions
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default SFMBookDashboard;