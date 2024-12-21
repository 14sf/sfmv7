import { useState, useEffect, useCallback } from 'react';
import { Message } from '../../types/social';
import { useToast } from '../useToast';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Hey, how are you?',
          sender: {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1'
          },
          receiver: {
            id: '1',
            name: 'Current User',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1'
          },
          createdAt: new Date().toISOString(),
          read: false
        }
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      showToast('Failed to load messages', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (receiverId: string, content: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: {
          id: '1',
          name: 'Current User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1'
        },
        receiver: {
          id: receiverId,
          name: 'Jane Smith',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1'
        },
        createdAt: new Date().toISOString(),
        read: false
      };

      setMessages([...messages, newMessage]);
      showToast('Message sent!', 'success');
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('Failed to send message', 'error');
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      setMessages(messages.map(message =>
        message.id === messageId ? { ...message, read: true } : message
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
      showToast('Failed to mark message as read', 'error');
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    markAsRead,
    refreshMessages: fetchMessages
  };
};