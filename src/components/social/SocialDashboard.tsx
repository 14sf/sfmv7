```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSocialContext } from '../../contexts/SocialContext';
import FeedSection from './feed/FeedSection';
import MessagesSection from './messages/MessagesSection';
import GroupsSection from './groups/GroupsSection';
import BookSection from './books/BookSection';
import PaymentSection from './payments/PaymentSection';
import MarketSection from './market/MarketSection';
import NotificationsPanel from './notifications/NotificationsPanel';

const SocialDashboard: React.FC = () => {
  const { activeSection } = useSocialContext();

  const renderSection = () => {
    switch (activeSection) {
      case 'feed':
        return <FeedSection />;
      case 'messages':
        return <MessagesSection />;
      case 'groups':
        return <GroupsSection />;
      case 'books':
        return <BookSection />;
      case 'payments':
        return <PaymentSection />;
      case 'market':
        return <MarketSection />;
      default:
        return <FeedSection />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {renderSection()}
        </motion.div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        <NotificationsPanel />
      </div>
    </div>
  );
};

export default SocialDashboard;
```