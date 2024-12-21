import React from 'react';
import { ProductCategory } from '../../../types/market';
import CategoryDropdown from './CategoryDropdown';

interface MarketCategoriesProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory) => void;
}

const MarketCategories: React.FC<MarketCategoriesProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Browse Categories
      </h3>
      
      <div className="max-w-md mx-auto">
        <CategoryDropdown
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </div>
    </section>
  );
};

export default MarketCategories;