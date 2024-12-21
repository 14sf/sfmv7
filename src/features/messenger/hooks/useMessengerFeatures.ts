import { useCallback } from 'react';
import { useToast } from '../../../hooks/useToast';

export const useMessengerFeatures = () => {
  const { showToast } = useToast();

  const handleNewChat = useCallback(() => {
    showToast('New chat feature coming soon!', 'info');
  }, [showToast]);

  const handleSettings = useCallback(() => {
    showToast('Settings feature coming soon!', 'info');
  }, [showToast]);

  const handleVoiceCall = useCallback(() => {
    showToast('Voice call feature coming soon!', 'info');
  }, [showToast]);

  const handleVideoCall = useCallback(() => {
    showToast('Video call feature coming soon!', 'info');
  }, [showToast]);

  const handleSearch = useCallback(() => {
    showToast('Search feature coming soon!', 'info');
  }, [showToast]);

  const handleEmojiPicker = useCallback(() => {
    showToast('Emoji picker coming soon!', 'info');
  }, [showToast]);

  return {
    handleNewChat,
    handleSettings,
    handleVoiceCall,
    handleVideoCall,
    handleSearch,
    handleEmojiPicker
  };
};