import React from 'react';
import { User } from '../../../../types/social';
import { formatDate } from '../../../../utils/format';

interface PostHeaderProps {
  author: User;
  createdAt: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author, createdAt }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">
          {author.name}
        </h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default PostHeader;