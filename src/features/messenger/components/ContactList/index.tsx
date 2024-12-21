import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Contact } from '../../types';
import ContactListItem from './ContactListItem';

interface ContactListProps {
  onSelectContact: (contact: Contact) => void;
  onClose: () => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact, onClose }) => {
  // Mock contacts for demonstration
  const contacts: Contact[] = [
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

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          New Chat
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onClick={() => onSelectContact(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;