import { useState } from 'react';
import { ProductCategory } from '../types/market';

export const useMarket = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  };
};