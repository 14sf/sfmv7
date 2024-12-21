import { useState, useEffect, useCallback } from 'react';
import { Group } from '../../types/social';
import { useToast } from '../useToast';

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockGroups: Group[] = [
        {
          id: '1',
          name: 'SFM Investors',
          description: 'A community for SFM token investors',
          members: [],
          createdAt: new Date().toISOString(),
          avatar: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1'
        }
      ];

      setGroups(mockGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
      showToast('Failed to load groups', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const createGroup = async (name: string, description: string) => {
    try {
      const newGroup: Group = {
        id: Date.now().toString(),
        name,
        description,
        members: [],
        createdAt: new Date().toISOString()
      };

      setGroups([...groups, newGroup]);
      showToast('Group created successfully!', 'success');
    } catch (error) {
      console.error('Error creating group:', error);
      showToast('Failed to create group', 'error');
    }
  };

  const joinGroup = async (groupId: string) => {
    try {
      setGroups(groups.map(group =>
        group.id === groupId
          ? {
              ...group,
              members: [
                ...group.members,
                {
                  id: '1',
                  name: 'Current User',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1'
                }
              ]
            }
          : group
      ));
      showToast('Joined group successfully!', 'success');
    } catch (error) {
      console.error('Error joining group:', error);
      showToast('Failed to join group', 'error');
    }
  };

  return {
    groups,
    isLoading,
    createGroup,
    joinGroup,
    refreshGroups: fetchGroups
  };
};