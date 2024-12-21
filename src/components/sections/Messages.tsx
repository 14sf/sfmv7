import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, Plus, Settings } from 'lucide-react';
import { useMessenger } from '../../features/messenger/contexts/MessengerContext';
import ChatList from '../../features/messenger/components/ChatList';
import ChatWindow from '../../features/messenger/components/ChatWindow';
import { useToast } from '../../hooks/useToast';

const Messages: React.FC = () => {
  const { chats, selectedChat, setSelectedChat, sendMessage } = useMessenger();
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const handleNewChat = () => {
    showToast('New chat feature coming soon!', 'info');
  };

  const handleSettings = () => {
    showToast('Settings feature coming soon!', 'info');
  };

  const handleFileUpload = async (file: File) => {
    try {
      // In a real app, this would upload the file
      showToast('File uploaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to upload file', 'error');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Messages
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNewChat}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSettings}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 dark:focus:bg-gray-700"
            />
          </div>
        </div>

        {/* Chat List */}
        <ChatList
          chats={chats}
          selectedChatId={selectedChat?.id}
          onSelectChat={setSelectedChat}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onSendMessage={(content, type) => sendMessage(content, type)}
            onUploadFile={handleFileUpload}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;