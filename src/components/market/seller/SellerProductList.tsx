import React from 'react';
import { Product } from '../../../types/market';
import SellerProductCard from './SellerProductCard';
import { useSellerProducts } from '../../../hooks/seller/useSellerProducts';

const SellerProductList = () => {
  const { products, updateProduct, deleteProduct } = useSellerProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <SellerProductCard
          key={product.id}
          product={product}
          onEdit={(updates) => updateProduct(product.id, updates)}
          onDelete={() => deleteProduct(product.id)}
        />
      ))}
    </div>
  );
};

export default SellerProductList;