import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, Video } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      // In a real app, this would make an API call
      showToast('Post created successfully!', 'success');
      setContent('');
      setMedia(null);
    } catch (error) {
      showToast('Failed to create post', 'error');
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      showToast('Media selected', 'success');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          id="create-post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 resize-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('image-upload')?.click()}
              className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
            >
              <Image className="w-5 h-5" />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('video-upload')?.click()}
              className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
            >
              <Video className="w-5 h-5" />
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
            </motion.button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Post
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;