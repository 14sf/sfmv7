import React from 'react';
import { motion } from 'framer-motion';
import { Store, Search } from 'lucide-react';
import ProductList from './ProductList';
import { useProducts } from '../../../hooks/social/useProducts';

const MarketSection = () => {
  const { products, isLoading } = useProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Marketplace</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          List Item
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        />
      </div>

      {/* Product Grid */}
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default MarketSection;