import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Share2 } from 'lucide-react';
import { Book } from '../../types';
import { useBookExport } from '../../hooks/useBookExport';
import { useToast } from '../../../../hooks/useToast';

interface BookHeaderProps {
  book: Book;
}

const BookHeader: React.FC<BookHeaderProps> = ({ book }) => {
  const { exportToCSV } = useBookExport();
  const { showToast } = useToast();

  const handleShare = async () => {
    try {
      const shareUrl = `https://app.example.com/books/${book.id}`;
      await navigator.clipboard.writeText(shareUrl);
      showToast('Share link copied to clipboard!', 'success');
    } catch (error) {
      showToast('Failed to share book', 'error');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {book.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {book.type} • Created {new Date(book.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => exportToCSV(book.id)}
          className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400"
        >
          <Download className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default BookHeader;