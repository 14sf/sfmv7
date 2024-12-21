import { useState, useCallback } from 'react';
import { Chat, Message } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { showToast } = useToast();

  const sendMessage = useCallback(async (content: string, type: Message['type'] = 'text') => {
    try {
      if (!selectedChat) {
        showToast('No chat selected', 'error');
        return;
      }

      const message: Message = {
        id: Date.now().toString(),
        content,
        type,
        senderId: 'current-user',
        receiverId: selectedChat.id,
        status: 'sent',
        timestamp: Date.now()
      };

      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            lastMessage: message,
            messages: [...(chat.messages || []), message],
            updatedAt: Date.now()
          };
        }
        return chat;
      }));

      showToast('Message sent successfully!', 'success');
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  }, [selectedChat, showToast]);

  const createChat = useCallback(async (participants: string[]): Promise<Chat | null> => {
    try {
      const newChat: Chat = {
        id: Date.now().toString(),
        type: participants.length > 1 ? 'group' : 'individual',
        participants,
        unreadCount: 0,
        pinned: false,
        archived: false,
        muted: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      setChats(prevChats => [...prevChats, newChat]);
      return newChat;
    } catch (error) {
      showToast('Failed to create chat', 'error');
      return null;
    }
  }, [showToast]);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
      }
      showToast('Chat deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete chat', 'error');
    }
  }, [selectedChat, showToast]);

  const updateChatSettings = useCallback(async (chatId: string, updates: Partial<Chat>) => {
    try {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === chatId) {
          return { ...chat, ...updates, updatedAt: Date.now() };
        }
        return chat;
      }));
      showToast('Chat settings updated!', 'success');
    } catch (error) {
      showToast('Failed to update chat settings', 'error');
    }
  }, [showToast]);

  return {
    chats,
    selectedChat,
    setSelectedChat,
    sendMessage,
    createChat,
    deleteChat,
    updateChatSettings
  };
};