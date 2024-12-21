import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types/market';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  icon: LucideIcon;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {category.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;