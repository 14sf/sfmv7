import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SectionType } from '../types/navigation';

interface NavigationContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionType>('exchange');

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
};