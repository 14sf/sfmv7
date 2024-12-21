import { useState } from 'react';
import { dodoAPI } from '../../services/dodo/api';
import { DodoQuoteResponse, DODO_API_CONFIG } from '../../services/dodo/types';
import { useToast } from '../useToast';

export const useDodoQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<DodoQuoteResponse['data'] | null>(null);
  const { showToast } = useToast();

  const getQuote = async (
    fromAmount: string,
    fromTokenAddress: string,
    toTokenAddress: string,
    chainId: number = DODO_API_CONFIG.chains.ETHEREUM
  ) => {
    setIsLoading(true);
    try {
      const response = await dodoAPI.getQuote({
        chainId,
        fromAmount,
        fromTokenAddress,
        toTokenAddress
      });

      setQuote(response.data);
      return response.data;
    } catch (error) {
      showToast('Failed to fetch quote', 'error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    quote,
    isLoading,
    getQuote
  };
};