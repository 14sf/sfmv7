import { useState, useEffect } from 'react';
import { Property } from '../../types/real-estate';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const mockProperties = [
          {
            id: '1',
            title: 'Modern Apartment',
            location: 'Kigali, Rwanda',
            price: 1200,
            status: 'occupied',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3'
          },
          {
            id: '2',
            title: 'Luxury Villa',
            location: 'Kigali, Rwanda',
            price: 2500,
            status: 'available',
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3'
          }
        ];
        setProperties(mockProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, isLoading };
};