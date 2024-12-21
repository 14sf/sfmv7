import React from 'react';
import { DashboardSection } from '../FinancialDashboard';
import { Book } from '../../../types/book';
import DashboardOverview from './sections/DashboardOverview';
import BudgetSection from './sections/BudgetSection';
import TransactionsSection from './sections/TransactionsSection';
import TeamSection from './sections/TeamSection';
import SettingsSection from './sections/SettingsSection';

interface DashboardContentProps {
  activeSection: DashboardSection;
  selectedBook: Book | null;
  onSelectBook: (book: Book | null) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeSection,
  selectedBook,
  onSelectBook
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview selectedBook={selectedBook} onSelectBook={onSelectBook} />;
      case 'budget':
        return <BudgetSection selectedBook={selectedBook} />;
      case 'transactions':
        return <TransactionsSection selectedBook={selectedBook} />;
      case 'team':
        return <TeamSection selectedBook={selectedBook} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
};

export default DashboardContent;