import { useState, useEffect } from 'react';

export const useExchangeWidget = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    const checkWidget = () => {
      try {
        const iframe = document.querySelector('iframe[title="DODO Exchange"]');
        if (iframe) {
          // Add event listeners to monitor iframe loading
          iframe.addEventListener('load', () => {
            setWidgetLoaded(true);
            setWidgetError(false);
          });

          iframe.addEventListener('error', () => {
            setWidgetError(true);
            setWidgetLoaded(false);
          });
        }
      } catch (error) {
        setWidgetError(true);
        setWidgetLoaded(false);
      }
    };

    checkWidget();
    
    // Check widget status periodically
    const interval = setInterval(checkWidget, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    widgetLoaded,
    widgetError
  };
};