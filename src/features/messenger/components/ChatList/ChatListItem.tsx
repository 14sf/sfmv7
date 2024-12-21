import React from 'react';
import { motion } from 'framer-motion';
import { Pin, BellOff, Archive } from 'lucide-react';
import { Chat } from '../../types';
import { formatMessagePreview, formatTime } from '../../utils/format';

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  isSelected,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
      onClick={onClick}
      className={`flex items-center gap-4 p-4 cursor-pointer ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src={`https://ui-avatars.com/api/?name=${chat.participants.join('+')}`}
          alt="Chat avatar"
          className="w-12 h-12 rounded-full"
        />
        {chat.lastMessage?.status === 'sent' && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full" />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {chat.type === 'group' ? chat.name : chat.participants[0]}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {formatTime(chat.lastMessage?.timestamp || chat.updatedAt)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {formatMessagePreview(chat.lastMessage)}
          </p>
          <div className="flex items-center gap-2">
            {chat.pinned && (
              <Pin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
            {chat.muted && (
              <BellOff className="w-4 h-4 text-gray-400" />
            )}
            {chat.archived && (
              <Archive className="w-4 h-4 text-gray-400" />
            )}
            {chat.unreadCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-600 rounded-full">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatListItem;