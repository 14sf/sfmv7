import { useState, useEffect } from 'react';
import { Contact } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        // In a real app, this would load contacts from the device/server
        const mockContacts: Contact[] = [
          {
            id: '1',
            name: 'John Doe',
            phone: '+250789123456',
            status: 'online',
            unreadCount: 0,
            isBlocked: false,
            isMuted: false
          },
          {
            id: '2',
            name: 'Jane Smith',
            phone: '+250789123457',
            status: 'offline',
            unreadCount: 0,
            isBlocked: false,
            isMuted: false
          }
        ];

        setContacts(mockContacts);
      } catch (error) {
        showToast('Failed to load contacts', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, [showToast]);

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const newContact: Contact = {
        ...contact,
        id: Date.now().toString()
      };
      setContacts([...contacts, newContact]);
      showToast('Contact added successfully!', 'success');
      return newContact;
    } catch (error) {
      showToast('Failed to add contact', 'error');
      return null;
    }
  };

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    try {
      setContacts(contacts.map(contact =>
        contact.id === id ? { ...contact, ...updates } : contact
      ));
      showToast('Contact updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update contact', 'error');
    }
  };

  const deleteContact = async (id: string) => {
    try {
      setContacts(contacts.filter(contact => contact.id !== id));
      showToast('Contact deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete contact', 'error');
    }
  };

  return {
    contacts,
    isLoading,
    addContact,
    updateContact,
    deleteContact
  };
};