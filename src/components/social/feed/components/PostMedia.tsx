import React from 'react';
import { motion } from 'framer-motion';

interface PostMediaProps {
  url: string;
  alt?: string;
}

const PostMedia: React.FC<PostMediaProps> = ({ url, alt = 'Post media' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-4 rounded-lg overflow-hidden"
    >
      <img
        src={url}
        alt={alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </motion.div>
  );
};

export default PostMedia;