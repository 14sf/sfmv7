import React from 'react';
import { motion } from 'framer-motion';
import { Home, MessageCircle, Users, Book, DollarSign, Store } from 'lucide-react';
import { useSocialContext } from '../../../contexts/SocialContext';

const SocialNavigation = () => {
  const { activeSection, setActiveSection } = useSocialContext();

  const navigationItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'books', label: 'SFMBook', icon: Book },
    { id: 'payments', label: 'SFMPay', icon: DollarSign },
    { id: 'market', label: 'SFMarket', icon: Store }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              SFM Social
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(id)}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeSection === id
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">{label}</span>
              </motion.button>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SocialNavigation;