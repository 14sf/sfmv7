```tsx
import React from 'react';
import { User } from '../../../../types/social';

interface PostAuthorProps {
  author: User;
  createdAt: string;
}

const PostAuthor: React.FC<PostAuthorProps> = ({ author, createdAt }) => {
  return (
    <div className="p-4 flex items-center gap-3">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">
          {author.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PostAuthor;
```