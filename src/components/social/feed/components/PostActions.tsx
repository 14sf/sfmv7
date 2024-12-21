```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useToast } from '../../../../hooks/useToast';

interface PostActionsProps {
  likes: number;
  commentsCount: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likes,
  commentsCount,
  onLike,
  onComment,
  onShare
}) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onLike}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 dark:text-gray-400"
        >
          <Heart className="w-5 h-5" />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onComment}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{commentsCount}</span>
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onShare}
        className="text-gray-500 hover:text-blue-500 dark:text-gray-400"
      >
        <Share2 className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default PostActions;
```