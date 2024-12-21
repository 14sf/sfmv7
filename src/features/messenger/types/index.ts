export interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'voice' | 'location';
  senderId: string;
  receiverId: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: number;
  metadata?: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    duration?: number;
    location?: {
      latitude: number;
      longitude: number;
      address?: string;
    };
  };
}

export interface Chat {
  id: string;
  type: 'individual' | 'group';
  participants: string[];
  messages?: Message[];
  lastMessage?: Message;
  unreadCount: number;
  pinned: boolean;
  archived: boolean;
  muted: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  status: 'online' | 'offline' | 'typing';
  lastSeen?: number;
  unreadCount: number;
  isBlocked: boolean;
  isMuted: boolean;
  labels?: string[];
}