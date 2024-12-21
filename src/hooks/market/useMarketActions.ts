import { useToast } from '../useToast';
import { Product } from '../../types/market';

export const useMarketActions = () => {
  const { showToast } = useToast();

  const handleAddToWishlist = (product: Product) => {
    // In a real app, this would make an API call to add to wishlist
    showToast(`Added ${product.title} to wishlist`, 'success');
  };

  const handleShare = async (product: Product) => {
    const shareData = {
      title: product.title,
      text: product.description,
      url: `${window.location.origin}/product/${product.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast('Shared successfully!', 'success');
      } else {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Link copied to clipboard!', 'success');
      }
    } catch (error) {
      showToast('Failed to share', 'error');
    }
  };

  return {
    handleAddToWishlist,
    handleShare
  };
};