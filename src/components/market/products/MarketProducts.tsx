import React from 'react';
import { motion } from 'framer-motion';
import { Product, ProductCategory } from '../../../types/market';
import MarketProductCard from './MarketProductCard';
import { useProducts } from '../../../hooks/useProducts';

interface MarketProductsProps {
  category: ProductCategory | null;
}

const MarketProducts: React.FC<MarketProductsProps> = ({ category }) => {
  const { products, isLoading } = useProducts(category);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {category ? `${category} Products` : 'All Products'}
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {products.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <MarketProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MarketProducts;