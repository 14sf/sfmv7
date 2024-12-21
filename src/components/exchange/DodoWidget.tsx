import React, { useCallback } from 'react';
import { SwapWidget } from '@dodoex/widgets';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import SFMErrorBoundary from './SFMErrorBoundary';
import { useEffect, useRef, useState } from 'react';
import { useWalletConnect } from '../../hooks/wallet/useWalletConnect';

export const SFMWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const widgetRef = useRef<any>(null);
  const { walletState } = useWalletConnect();

  const config = useRef({
    apikey: import.meta.env.VITE_SFM_API_KEY || '',
    width: 375,
    height: 494,
    tokenList: {
      tokens: [
        {
          symbol: 'SFM',
          address: '0x7e0a573b3897aaab1cc4710de6402c14b851e905',
          decimals: 18,
          chainId: 1,
          name: 'SFM Token',
          logoURI: 'https://example.com/sfm-logo.png'
        }
      ]
    },
    bridgeSlippage: 0.5, 
    crossChain: true,
    walletAddress: walletState.address || undefined
  }).current;

  const handleWidgetLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (widgetRef.current) {
      handleWidgetLoad();
    }
    return () => {
      widgetRef.current = null;
    };
  }, []);

  return (
    <SFMErrorBoundary>
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg overflow-hidden shadow-sm"
      >
        {!isLoading && (
          <SwapWidget
            ref={widgetRef}
            apikey={config.apikey}
            width={config.width}
            height={config.height}
            tokenList={config.tokenList}
            rebateTo={config.rebateTo}
            feeRate={config.feeRate}
            onLoad={handleWidgetLoad}
          />
        )}
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      </div>
    </div>
    </SFMErrorBoundary>
  );
};
