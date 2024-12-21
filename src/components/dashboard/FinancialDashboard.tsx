import React, { useState } from 'react';
import { Home, BarChart, DollarSign, Users, Settings } from 'lucide-react';
import DashboardNav from './navigation/DashboardNav';
import DashboardContent from './content/DashboardContent';
import { Book } from '../../types/book';

export type DashboardSection = 'dashboard' | 'budget' | 'transactions' | 'team' | 'settings';

const navigationSections = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'budget', label: 'Budget', icon: BarChart },
  { id: 'transactions', label: 'Transactions', icon: DollarSign },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const FinancialDashboard = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeSection, setActiveSection] = useState<DashboardSection>('dashboard');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardNav
        sections={navigationSections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardContent
          activeSection={activeSection}
          selectedBook={selectedBook}
          onSelectBook={setSelectedBook}
        />
      </main>
    </div>
  );
};

export default FinancialDashboard;