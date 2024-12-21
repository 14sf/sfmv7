import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, MessageCircle, Users, BookOpen, Wallet, Store, Building, CreditCard } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { SectionType } from '../../types/navigation';

const MobileNavigation: React.FC = () => {
  const { activeSection, setActiveSection } = useNavigation();

  const navigationItems = [
    { id: 'exchange', icon: ArrowLeftRight },
    { id: 'messages', icon: MessageCircle },
    { id: 'groups', icon: Users },
    { id: 'sfmbook', icon: BookOpen },
    { id: 'sfmpay', icon: Wallet },
    { id: 'sfmwallet', icon: CreditCard },
    { id: 'sfmarket', icon: Store },
    { id: 'sfmrealestate', icon: Building }
  ];

  return (
    <div className="flex justify-around py-2">
      {navigationItems.map(({ id, icon: Icon }) => (
        <motion.button
          key={id}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveSection(id as SectionType)}
          className={`p-3 rounded-full ${
            activeSection === id
              ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Icon className="w-6 h-6" />
        </motion.button>
      ))}
    </div>
  );
};

export default MobileNavigation;