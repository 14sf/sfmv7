import { useState, useCallback } from 'react';
import { useToast } from '../useToast';
import { ExchangeRate, SUPPORTED_PAIRS } from '../../types/exchange/rates';
import Decimal from 'decimal.js';

export const useExchange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const calculateExchangeAmount = useCallback((
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    const pair = SUPPORTED_PAIRS.find(
      p => (p.base === fromCurrency && p.quote === toCurrency) ||
          (p.base === toCurrency && p.quote === fromCurrency)
    );

    if (!pair) {
      throw new Error('Unsupported currency pair');
    }

    // Use Decimal.js for precise calculations
    const rate = new Decimal(pair.rate);
    const fee = new Decimal(pair.fee);
    const amountDecimal = new Decimal(amount);

    const result = amountDecimal.times(rate);
    const feeAmount = result.times(fee);
    
    return result.minus(feeAmount).toNumber();
  }, []);

  const executeExchange = async (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    setIsLoading(true);
    try {
      // Validate amount against limits
      const pair = SUPPORTED_PAIRS.find(
        p => (p.base === fromCurrency && p.quote === toCurrency) ||
            (p.base === toCurrency && p.quote === fromCurrency)
      );

      if (!pair) {
        throw new Error('Unsupported currency pair');
      }

      if (amount < pair.minAmount || amount > pair.maxAmount) {
        throw new Error(`Amount must be between ${pair.minAmount} and ${pair.maxAmount}`);
      }

      // Calculate exchange amount
      const exchangedAmount = calculateExchangeAmount(amount, fromCurrency, toCurrency);

      // In a real app, this would make an API call to execute the exchange
      await new Promise(resolve => setTimeout(resolve, 1000));

      showToast('Exchange executed successfully!', 'success');
      return exchangedAmount;
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Exchange failed', 'error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    executeExchange,
    calculateExchangeAmount
  };
};