import { useState, useCallback } from 'react';
import { Chat, Message } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useMessengerState = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { showToast } = useToast();

  const sendMessage = useCallback(async (content: string, type: Message['type'] = 'text') => {
    if (!selectedChat) return;

    try {
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
            messages: [...(chat.messages || []), message],
            lastMessage: message,
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

  const createChat = useCallback(async (participants: string[]) => {
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

      setChats(prev => [...prev, newChat]);
      return newChat;
    } catch (error) {
      showToast('Failed to create chat', 'error');
      return null;
    }
  }, [showToast]);

  return {
    chats,
    selectedChat,
    setSelectedChat,
    sendMessage,
    createChat
  };
};