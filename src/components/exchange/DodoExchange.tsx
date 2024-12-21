import React, { useCallback } from 'react';
import { SwapWidget } from '@dodoex/widgets';
import { motion } from 'framer-motion';
import ErrorBoundary from './DodoErrorBoundary';
import { useEffect, useRef, useState } from 'react';

const DodoExchange = () => {
  const [isLoading, setIsLoading] = useState(true);
  const widgetRef = useRef<any>(null);

  // Configuration for the DODO widget
  const config = useRef({
    apikey: import.meta.env.VITE_DODO_API_KEY || '',
    colorMode: 'light',
    width: 380,
    height: 500,
    tokenList: {
      // Define supported tokens
      tokens: [
        {
          symbol: 'SFM',
          address: '0x7e0a573b3897aaab1cc4710de6402c14b851e905',
          decimals: 18,
          chainId: 1, // Ethereum mainnet
          name: 'SFM Token',
          logoURI: 'https://example.com/sfm-logo.png'
        }
      ]
    },
    // Set rebate configuration
    rebateTo: '0x7e0a573b3897aaab1cc4710de6402c14b851e905',
    feeRate: 0.002, // 0.2% fee
    swapSlippage: 0.5, // 0.5% slippage
    bridgeSlippage: 0.5,
    crossChain: true
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
    <ErrorBoundary>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        SFM DEX
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        {!isLoading && (
          <SwapWidget
            ref={widgetRef}
            apikey={config.apikey}
            colorMode={config.colorMode}
            width={config.width}
            height={config.height}
            tokenList={config.tokenList}
            rebateTo={config.rebateTo}
            feeRate={config.feeRate}
            swapSlippage={config.swapSlippage}
            bridgeSlippage={config.bridgeSlippage}
            crossChain={config.crossChain}
            onLoad={handleWidgetLoad}
          />
        )}
      </motion.div>
    </div>
    </ErrorBoundary>
  );
};

export default DodoExchange;