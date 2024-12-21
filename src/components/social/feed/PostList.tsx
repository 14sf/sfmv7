import React from 'react';
import { motion } from 'framer-motion';
import { Post } from '../../../types/social';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </div>
  );
};

export default PostList;