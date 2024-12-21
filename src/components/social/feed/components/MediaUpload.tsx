```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Image, Video } from 'lucide-react';

interface MediaUploadProps {
  onImageUpload: (file: File) => void;
  onVideoUpload: (file: File) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onImageUpload,
  onVideoUpload
}) => {
  return (
    <div className="flex gap-2">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <Image className="w-5 h-5" />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(file);
          }}
        />
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
        onClick={() => document.getElementById('video-upload')?.click()}
      >
        <Video className="w-5 h-5" />
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onVideoUpload(file);
          }}
        />
      </motion.button>
    </div>
  );
};

export default MediaUpload;
```