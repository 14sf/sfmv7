import { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../../types/market';
import { MOCK_PRODUCTS } from '../../utils/constants/mockData';

export const useMarketProducts = (category: ProductCategory | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(
        category 
          ? MOCK_PRODUCTS.filter(p => p.category === category)
          : MOCK_PRODUCTS
      );
      setIsLoading(false);
    }, 1000);
  }, [category]);

  return { products, isLoading };
};