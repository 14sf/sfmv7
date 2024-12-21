import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface DodoExchangeWidgetProps {
  width?: number;
  height?: number;
}

const DodoExchangeWidget: React.FC<DodoExchangeWidgetProps> = ({
  width = 375,
  height = 494
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    showToast('Failed to load DODO Exchange', 'error');
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {hasError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">Unable to load DODO Exchange</p>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
            Please try again later or visit DODO Exchange directly.
          </p>
          <a
            href="https://app.dodoex.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Visit DODO Exchange
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      ) : (
        <iframe
          src="https://app.dodoex.io/exchange/USDT-SFM?network=mainnet"
          width={width}
          height={height}
          frameBorder="0"
          className="rounded-lg"
          title="DODO Exchange"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Powered by DODO Exchange
      </p>
    </div>
  );
};

export default DodoExchangeWidget;