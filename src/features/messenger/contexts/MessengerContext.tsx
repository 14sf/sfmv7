import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chat, Message } from '../types';
import { useToast } from '../../../hooks/useToast';
import { useMessengerState } from '../hooks/useMessengerState';

interface MessengerContextType {
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  sendMessage: (content: string, type: Message['type']) => void;
  createChat: (participants: string[]) => Promise<Chat | null>;
  deleteChat: (chatId: string) => void;
}

const MessengerContext = createContext<MessengerContextType | undefined>(undefined);

export const useMessenger = () => {
  const context = useContext(MessengerContext);
  if (!context) {
    throw new Error('useMessenger must be used within a MessengerProvider');
  }
  return context;
};

interface MessengerProviderProps {
  children: ReactNode;
}

export const MessengerProvider: React.FC<MessengerProviderProps> = ({ children }) => {
  const {
    chats,
    selectedChat,
    setSelectedChat,
    sendMessage,
    createChat,
    deleteChat
  } = useMessengerState();

  return (
    <MessengerContext.Provider value={{
      chats,
      selectedChat,
      setSelectedChat,
      sendMessage,
      createChat,
      deleteChat
    }}>
      {children}
    </MessengerContext.Provider>
  );
};