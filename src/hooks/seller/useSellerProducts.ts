import { useState } from 'react';
import { Product } from '../../types/market';
import { useToast } from '../useToast';

export const useSellerProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { showToast } = useToast();

  const addProduct = (product: Omit<Product, 'id' | 'sellerId' | 'createdAt' | 'status'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      sellerId: '1', // In a real app, this would come from auth
      createdAt: Date.now(),
      status: 'active' as const
    };
    setProducts([...products, newProduct]);
    showToast('Product added successfully!', 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    ));
    showToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    showToast('Product deleted successfully!', 'success');
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
};