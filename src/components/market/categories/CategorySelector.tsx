import React from 'react';
import { motion } from 'framer-motion';
import { Home, Car, Briefcase, Plane } from 'lucide-react';
import { ProductCategory } from '../../../types/market';

interface CategorySelectorProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

const categories = [
  { id: 'real-estate', label: 'Real Estate', icon: Home },
  { id: 'automotive', label: 'Automotive', icon: Car },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'tourism', label: 'Tourism', icon: Plane }
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectCategory(selectedCategory === id ? null : id as ProductCategory)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === id
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategorySelector;