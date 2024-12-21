import { useState, useEffect } from 'react';

export interface PropertyStat {
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export const usePropertyStats = () => {
  const [stats, setStats] = useState<PropertyStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const data = [
          {
            label: 'Total Properties',
            value: '12',
            change: '+2',
            changeType: 'increase'
          },
          {
            label: 'Monthly Revenue',
            value: '24,500 SFM',
            change: '+5.2%',
            changeType: 'increase'
          },
          {
            label: 'Active Tenants',
            value: '18',
            change: '+3',
            changeType: 'increase'
          },
          {
            label: 'Maintenance Requests',
            value: '5',
            change: '-2',
            changeType: 'decrease'
          }
        ];
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading };
};