import React from 'react';
import { motion } from 'framer-motion';
import CreatePost from './CreatePost';
import PostList from './PostList';
import { usePosts } from '../../../hooks/social/usePosts';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';
import { MessageSquarePlus } from 'lucide-react';

const FeedSection = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <CreatePost />
      
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <EmptyState
          icon={MessageSquarePlus}
          title="No Posts Yet"
          description="Be the first to share something with your network!"
          action={{
            label: "Create Post",
            onClick: () => document.getElementById('create-post')?.focus()
          }}
        />
      )}
    </div>
  );
};

export default FeedSection;