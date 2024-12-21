import { useToast } from '../../hooks/useToast';

export const useMarketActions = () => {
  const { showToast } = useToast();

  const handleShare = async (url: string, title: string, text?: string) => {
    const shareData = { url, title, text };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast('Shared successfully!', 'success');
      } else {
        await navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!', 'success');
      }
    } catch (error) {
      showToast('Failed to share', 'error');
    }
  };

  const handlePayment = async (amount: number): Promise<boolean> => {
    try {
      showToast('Processing payment...', 'info');
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('Payment successful!', 'success');
      return true;
    } catch (error) {
      showToast('Payment failed. Please try again.', 'error');
      return false;
    }
  };

  return {
    handleShare,
    handlePayment
  };
};