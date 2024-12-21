import React from 'react';
import { Home, Store, User, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SF Market</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {[
              { icon: Home, label: 'Home' },
              { icon: ShoppingBag, label: 'Products' },
              { icon: User, label: 'Account' }
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icon className="w-5 h-5 mr-2" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;