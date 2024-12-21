import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MarketCategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
  };
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

const MarketCategoryCard: React.FC<MarketCategoryCardProps> = ({
  category,
  icon: Icon,
  isSelected,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${
        isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${
          isSelected 
            ? 'bg-blue-500 text-white' 
            : 'bg-blue-100 dark:bg-blue-900'
        }`}>
          <Icon className={`w-6 h-6 ${
            isSelected 
              ? 'text-white' 
              : 'text-blue-600 dark:text-blue-400'
          }`} />
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

export default MarketCategoryCard;