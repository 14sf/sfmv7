import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../../../types/social';
import { useToast } from '../../../hooks/useToast';
import { formatDate } from '../../../utils/format';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { showToast } = useToast();

  const handleLike = () => {
    showToast('Post liked!', 'success');
  };

  const handleComment = () => {
    showToast('Comments coming soon!', 'info');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this post',
        text: post.content,
        url: window.location.href
      });
    } catch (error) {
      showToast('Failed to share post', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Author Info */}
      <div className="p-4 flex items-center gap-3">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {post.author.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-900 dark:text-white">{post.content}</p>
        {post.media && (
          <img
            src={post.media}
            alt="Post media"
            className="mt-4 rounded-lg w-full"
          />
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 dark:text-gray-400"
          >
            <Heart className="w-5 h-5" />
            <span>{post.likes}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleComment}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="text-gray-500 hover:text-blue-500 dark:text-gray-400"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default PostCard;