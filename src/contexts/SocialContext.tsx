import React, { createContext, useContext, useState, ReactNode } from 'react';

type SocialSection = 'feed' | 'messages' | 'groups' | 'books' | 'payments' | 'market';

interface SocialContextType {
  activeSection: SocialSection;
  setActiveSection: (section: SocialSection) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const useSocialContext = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocialContext must be used within a SocialProvider');
  }
  return context;
};

interface SocialProviderProps {
  children: ReactNode;
}

export const SocialProvider: React.FC<SocialProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SocialSection>('feed');

  return (
    <SocialContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SocialContext.Provider>
  );
};