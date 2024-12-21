import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';

const Feed: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6"
      >
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 resize-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Post
          </motion.button>
        </div>
      </motion.div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center py-12"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <MessageSquarePlus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Posts Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Be the first to share something with your network!
        </p>
      </motion.div>
    </div>
  );
};

export default Feed;