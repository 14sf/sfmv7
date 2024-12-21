import { useState, useEffect } from 'react';
import { PaymentOverview } from '../../types/real-estate';

export const usePayments = () => {
  const [payments, setPayments] = useState<PaymentOverview>({
    monthlyRevenue: 24500,
    pendingPayments: 3200,
    overduePayments: 800,
    changePercentage: 5.2
  });

  useEffect(() => {
    // Simulate API call
    const fetchPayments = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        setPayments({
          monthlyRevenue: 24500,
          pendingPayments: 3200,
          overduePayments: 800,
          changePercentage: 5.2
        });
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return payments;
};