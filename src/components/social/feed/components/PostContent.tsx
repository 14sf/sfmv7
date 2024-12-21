```tsx
import React from 'react';

interface PostContentProps {
  content: string;
  media?: string;
}

const PostContent: React.FC<PostContentProps> = ({ content, media }) => {
  return (
    <div className="px-4 pb-4">
      <p className="text-gray-900 dark:text-white">{content}</p>
      {media && (
        <img
          src={media}
          alt="Post media"
          className="mt-4 rounded-lg w-full"
        />
      )}
    </div>
  );
};

export default PostContent;
```