import { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types/market';

// Simulated product data
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Modern Apartment',
    description: 'Beautiful 2-bedroom apartment with city view',
    price: 250000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3',
    sellerId: '1',
    createdAt: Date.now(),
    status: 'active'
  },
  {
    id: '2',
    title: 'Tesla Model 3',
    description: 'Electric vehicle in perfect condition',
    price: 45000,
    category: 'automotive',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3',
    sellerId: '1',
    createdAt: Date.now(),
    status: 'active'
  }
];

export const useProducts = (category: ProductCategory | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProducts(
        category 
          ? mockProducts.filter(p => p.category === category)
          : mockProducts
      );
      setIsLoading(false);
    }, 1000);
  }, [category]);

  return { products, isLoading };
};