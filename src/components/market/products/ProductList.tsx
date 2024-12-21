import React from 'react';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { Product } from '../../../types/market';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  searchQuery
}) => {
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Products Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {searchQuery
            ? "No products match your search criteria"
            : "No products available in this category"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;