import React from 'react';
import { ProductCategory } from '../../../types/market';

interface ProductBadgeProps {
  category: ProductCategory;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({ category }) => {
  return (
    <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
      {category}
    </div>
  );
};

export default ProductBadge;