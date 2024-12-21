import { useState, useEffect } from 'react';
import { Chat, Message, Contact } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useMessenger = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        // In a real app, this would load contacts from the device
        if ('contacts' in navigator && 'ContactsManager' in window) {
          const props = ['name', 'tel'];
          const opts = { multiple: true };
          const deviceContacts = await navigator.contacts.select(props, opts);
          // Process contacts...
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };

    loadContacts();
  }, []);

  const sendMessage = async (chatId: string, content: string, type: Message['type'] = 'text') => {
    try {
      const message: Message = {
        id: Date.now().toString(),
        content,
        type,
        senderId: 'current-user',
        receiverId: chatId,
        status: 'sent',
        timestamp: Date.now()
      };

      setChats(chats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            lastMessage: message,
            messages: [...(chat.messages || []), message]
          };
        }
        return chat;
      }));

      showToast('Message sent successfully!', 'success');
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  const createChat = async (contact: Contact) => {
    try {
      const newChat: Chat = {
        id: Date.now().toString(),
        type: 'individual',
        participants: [contact.id],
        unreadCount: 0,
        pinned: false,
        archived: false,
        muted: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      setChats([...chats, newChat]);
      return newChat;
    } catch (error) {
      showToast('Failed to create chat', 'error');
      return null;
    }
  };

  return {
    chats,
    contacts,
    isLoading,
    sendMessage,
    createChat
  };
};