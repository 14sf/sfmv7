import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../../hooks/social/useNotifications';

const NotificationsPanel = () => {
  const { notifications } = useNotifications();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Notifications
          </h3>
        </div>
        {notifications.length > 0 && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-full">
            {notifications.length} new
          </span>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg ${
              notification.read
                ? 'bg-gray-50 dark:bg-gray-700'
                : 'bg-blue-50 dark:bg-blue-900/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={notification.actor.avatar}
                alt={notification.actor.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{notification.actor.name}</span>
                  {' '}
                  {notification.type === 'like' && 'liked your post'}
                  {notification.type === 'comment' && 'commented on your post'}
                  {notification.type === 'mention' && 'mentioned you'}
                  {notification.type === 'follow' && 'started following you'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {notifications.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No new notifications
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;