import { useState, useEffect } from 'react';
import { Product } from '../../types/social';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProducts = [
          {
            id: '1',
            title: 'Modern Apartment',
            description: 'Beautiful 2-bedroom apartment with city view',
            price: 250000,
            category: 'Real Estate',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Tesla Model 3',
            description: 'Electric vehicle in perfect condition',
            price: 45000,
            category: 'Automotive',
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3',
            createdAt: new Date().toISOString()
          }
        ];

        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading };
};