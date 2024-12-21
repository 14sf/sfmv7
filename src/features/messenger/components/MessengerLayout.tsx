import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, Plus, Settings } from 'lucide-react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import ContactList from './ContactList';
import { Chat, Contact } from '../types';
import { useToast } from '../../../hooks/useToast';

const MessengerLayout: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showContacts, setShowContacts] = useState(false);
  const { showToast } = useToast();

  const handleNewChat = (contact: Contact) => {
    // In a real app, this would create a new chat
    showToast('Starting new conversation...', 'info');
    setShowContacts(false);
  };

  const handleSendMessage = (content: string, type: 'text' | 'image' | 'document') => {
    if (!selectedChat) return;
    // In a real app, this would send the message
    showToast('Message sent!', 'success');
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
    <div className="flex h-screen bg-white dark:bg-gray-900">
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowContacts(true)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 dark:focus:bg-gray-700"
            />
          </div>
        </div>

        {/* Chat/Contact List */}
        {showContacts ? (
          <ContactList onSelectContact={handleNewChat} onClose={() => setShowContacts(false)} />
        ) : (
          <ChatList
            selectedChatId={selectedChat?.id}
            onSelectChat={setSelectedChat}
          />
        )}
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onSendMessage={handleSendMessage}
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

export default MessengerLayout;