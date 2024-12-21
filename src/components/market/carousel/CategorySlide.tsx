import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../../types/market';

interface CategorySlideProps {
  category: Category;
}

const CategorySlide: React.FC<CategorySlideProps> = ({ category }) => {
  const Icon = category.icon;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 px-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 space-y-6"
      >
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          {category.name}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {category.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore {category.name}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </motion.div>
    </div>
  );
};

export default CategorySlide;