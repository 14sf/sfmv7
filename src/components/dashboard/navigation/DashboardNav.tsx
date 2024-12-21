import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { DashboardSection } from '../FinancialDashboard';

interface DashboardNavProps {
  sections: {
    id: DashboardSection;
    label: string;
    icon: LucideIcon;
  }[];
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({
  sections,
  activeSection,
  onSectionChange
}) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8 h-16 items-center">
          {sections.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSectionChange(id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200
                ${activeSection === id 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;