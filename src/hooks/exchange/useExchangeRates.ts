import { useState, useEffect } from 'react';
import { ExchangeRate } from '../../types/exchange';
import { useToast } from '../useToast';

export const useExchangeRates = (baseCurrency: string, targetCurrencies: string[]) => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch from an exchange rate API
        const mockRates = targetCurrencies.map(currency => ({
          fromCurrency: baseCurrency,
          toCurrency: currency,
          rate: Math.random() * 1000 + 500, // Mock rate between 500-1500
          timestamp: Date.now()
        }));
        
        setRates(mockRates);
      } catch (error) {
        showToast('Failed to fetch exchange rates', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [baseCurrency, targetCurrencies, showToast]);

  return { rates, isLoading };
};