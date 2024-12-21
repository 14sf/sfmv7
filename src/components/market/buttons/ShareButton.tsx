import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
  disabled?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title,
  text,
  disabled = false
}) => {
  const { showToast } = useToast();

  const handleShare = async () => {
    if (disabled) return;

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

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handleShare}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 p-2 rounded-lg border-2 ${
        disabled
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-blue-200 hover:border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
      } transition-colors`}
    >
      <Share2 className="w-4 h-4" />
      <span className="text-sm font-medium">Share</span>
    </motion.button>
  );
};

export default ShareButton;