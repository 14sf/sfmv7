import { useState, useEffect } from 'react';
import { Notification } from '../../types/social';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchNotifications = async () => {
      // Mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'like',
          actor: {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1'
          },
          target: 'post-1',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'comment',
          actor: {
            id: '3',
            name: 'Mike Johnson',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1'
          },
          target: 'post-2',
          read: true,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ];

      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, []);

  return { notifications };
};