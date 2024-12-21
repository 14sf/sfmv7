import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Search, MoreVertical } from 'lucide-react';
import { Chat } from '../../types';
import { useToast } from '../../../../hooks/useToast';

interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat }) => {
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} feature coming soon!`, 'info');
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <img
          src={`https://ui-avatars.com/api/?name=${chat.participants.join('+')}`}
          alt="Chat avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {chat.type === 'group' ? chat.name : chat.participants[0]}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {chat.type === 'group' ? `${chat.participants.length} participants` : 'Online'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleAction('Voice call')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <Phone className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleAction('Video call')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <Video className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleAction('Search')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <Search className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleAction('More options')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <MoreVertical className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatHeader;