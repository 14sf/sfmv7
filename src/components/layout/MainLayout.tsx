import React from 'react';
import Header from '../shared/Header';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';
import MobileNavigation from '../shared/MobileNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Header />
      
      <div className="flex flex-1 relative">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <MobileNavigation />
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;