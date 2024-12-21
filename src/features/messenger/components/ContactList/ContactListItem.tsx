import React from 'react';
import { motion } from 'framer-motion';
import { Contact } from '../../types';

interface ContactListItemProps {
  contact: Contact;
  onClick: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact, onClick }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 cursor-pointer"
    >
      <div className="relative">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}`}
          alt={contact.name}
          className="w-12 h-12 rounded-full"
        />
        {contact.status === 'online' && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
        )}
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {contact.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {contact.phone}
        </p>
      </div>
    </motion.div>
  );
};

export default ContactListItem;