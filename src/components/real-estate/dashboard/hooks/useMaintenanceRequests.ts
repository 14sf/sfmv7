import { useState, useEffect } from 'react';

export interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export const useMaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const data = [
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
        ] as MaintenanceRequest[];
        setRequests(data);
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