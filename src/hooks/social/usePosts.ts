import { useState, useEffect, useCallback } from 'react';
import { Post } from '../../types/social';
import { useToast } from '../useToast';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPosts: Post[] = [
        {
          id: '1',
          content: 'Just listed a new property on SFMarket! Check it out 🏠',
          author: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1'
          },
          likes: 12,
          comments: [],
          createdAt: new Date().toISOString(),
          media: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'
        }
      ];

      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      showToast('Failed to load posts', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (content: string, media?: File) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPost: Post = {
        id: Date.now().toString(),
        content,
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1'
        },
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        media: media ? URL.createObjectURL(media) : undefined
      };

      setPosts([newPost, ...posts]);
      showToast('Post created successfully!', 'success');
    } catch (error) {
      console.error('Error creating post:', error);
      showToast('Failed to create post', 'error');
    }
  };

  const likePost = async (postId: string) => {
    try {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      showToast('Post liked!', 'success');
    } catch (error) {
      console.error('Error liking post:', error);
      showToast('Failed to like post', 'error');
    }
  };

  return {
    posts,
    isLoading,
    createPost,
    likePost,
    refreshPosts: fetchPosts
  };
};