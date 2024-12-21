import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../../types/social';
import ProductCard from './ProductCard';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';
import { Store } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Store}
        title="No Products Found"
        description="Be the first to list a product in the marketplace!"
        action={{
          label: "List Item",
          onClick: () => {}
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
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