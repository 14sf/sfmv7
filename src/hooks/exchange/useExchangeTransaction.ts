import { useState } from 'react';
import { ExchangeTransaction } from '../../types/exchange';
import { useToast } from '../useToast';

export const useExchangeTransaction = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const executeExchange = async (
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    rate: number
  ): Promise<ExchangeTransaction | null> => {
    setIsProcessing(true);
    try {
      // In a real app, this would make an API call to execute the exchange
      const transaction: ExchangeTransaction = {
        id: Date.now().toString(),
        fromCurrency,
        toCurrency,
        fromAmount: amount,
        toAmount: amount * rate,
        rate,
        timestamp: Date.now(),
        status: 'completed'
      };

      showToast('Exchange completed successfully!', 'success');
      return transaction;
    } catch (error) {
      showToast('Exchange failed. Please try again.', 'error');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    executeExchange
  };
};