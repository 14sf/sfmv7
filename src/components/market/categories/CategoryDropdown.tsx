import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MARKET_CATEGORIES } from '../../../utils/constants/market';
import { ProductCategory } from '../../../types/market';

interface CategoryDropdownProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = MARKET_CATEGORIES.find(cat => cat.id === selectedCategory);
  
  return (
    <div className="relative">
      {/* Dropdown Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      >
        <div className="flex items-center gap-3">
          {selectedItem ? (
            <>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <selectedItem.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedItem.name}
              </span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              Select a category
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            {MARKET_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => {
                    onSelectCategory(category.id as ProductCategory);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-3 p-3 text-left transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isSelected 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      isSelected 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {category.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDropdown;