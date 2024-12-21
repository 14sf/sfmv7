import { Message } from '../types';

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleDateString();
};

export const formatMessagePreview = (message?: Message): string => {
  if (!message) return '';

  switch (message.type) {
    case 'image':
      return '📷 Photo';
    case 'document':
      return '📎 Document';
    case 'voice':
      return '🎤 Voice message';
    case 'location':
      return '📍 Location';
    default:
      return message.content.length > 30
        ? `${message.content.substring(0, 30)}...`
        : message.content;
  }
};