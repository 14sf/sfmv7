```typescript
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  likes: number;
  comments: Comment[];
  createdAt: string;
  media?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  createdAt: string;
  read: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'mention' | 'follow';
  actor: User;
  target: string;
  read: boolean;
  createdAt: string;
}
```