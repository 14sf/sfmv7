import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, MessageCircle, Users, BookOpen, Wallet, Store, Building, CreditCard } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { SectionType } from '../../types/navigation';

const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection } = useNavigation();

  const sections = [
    { id: 'exchange', label: 'Exchange', icon: ArrowLeftRight },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'sfmbook', label: 'SFMBook', icon: BookOpen },
    { id: 'sfmpay', label: 'SFMPay', icon: Wallet },
    { id: 'sfmwallet', label: 'SFMWallet', icon: CreditCard },
    { id: 'sfmarket', label: 'SFMarket', icon: Store },
    { id: 'sfmrealestate', label: 'SFMRealEstate', icon: Building }
  ];

  const handleSectionClick = (sectionId: SectionType) => {
    setActiveSection(sectionId);
  };

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="space-y-1">
        {sections.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSectionClick(id as SectionType)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === id
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;