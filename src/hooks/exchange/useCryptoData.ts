import { useState, useEffect } from 'react';
import { CryptoCurrency, CryptoMarketData, MOCK_TOP_CRYPTOS } from '../../types/exchange/crypto';
import { useToast } from '../useToast';

export const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [marketData, setMarketData] = useState<CryptoMarketData>({
    totalMarketCap: 0,
    totalVolume24h: 0,
    btcDominance: 0,
    marketCapChange24h: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch from a crypto API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCryptos(MOCK_TOP_CRYPTOS);
        setMarketData({
          totalMarketCap: 2300000000000,
          totalVolume24h: 98000000000,
          btcDominance: 42.5,
          marketCapChange24h: 3.2
        });
      } catch (error) {
        showToast('Failed to fetch crypto data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [showToast]);

  return {
    cryptos,
    marketData,
    isLoading
  };
};