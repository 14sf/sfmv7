import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../../types/social';
import { formatDate } from '../../../utils/format';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSelectMessage?: (message: Message) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, onSelectMessage }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {messages.map((message, index) => (
        <motion.button
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectMessage?.(message)}
          className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <img
              src={message.sender.avatar}
              alt={message.sender.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                  {message.sender.name}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                  {formatDate(message.createdAt)}
                </span>
              </div>
              <p className={`text-sm truncate ${
                message.read 
                  ? 'text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white font-medium'
              }`}>
                {message.content}
              </p>
            </div>
          </div>
        </motion.button>
      ))}

      {messages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No messages yet
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageList;