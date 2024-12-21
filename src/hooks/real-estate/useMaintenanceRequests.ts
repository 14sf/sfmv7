import { useState, useEffect } from 'react';
import { MaintenanceRequest } from '../../types/real-estate';

export const useMaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const mockRequests = [
          {
            id: '1',
            title: 'Plumbing Issue',
            property: 'Modern Apartment',
            status: 'pending',
            priority: 'high',
            createdAt: '2h ago'
          },
          {
            id: '2',
            title: 'AC Maintenance',
            property: 'Luxury Villa',
            status: 'in-progress',
            priority: 'medium',
            createdAt: '1d ago'
          }
        ];
        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { requests, isLoading };
};