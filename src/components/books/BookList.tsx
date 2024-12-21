import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Book } from '../../types/book';

interface BookListProps {
  books: Book[];
  selectedBook: Book | null;
  onSelectBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onAddTransaction: () => void;
  onSubtractTransaction: () => void;
}

const BookList: React.FC<BookListProps> = ({
  books,
  selectedBook,
  onSelectBook,
  onDeleteBook,
  onAddTransaction,
  onSubtractTransaction
}) => {
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 3 });

  const showPrevious = visibleRange.start > 0;
  const showNext = visibleRange.end < books.length;

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'up' && showPrevious) {
      setVisibleRange(prev => ({
        start: prev.start - 1,
        end: prev.end - 1
      }));
    } else if (direction === 'down' && showNext) {
      setVisibleRange(prev => ({
        start: prev.start + 1,
        end: prev.end + 1
      }));
    }
  };

  return (
    <div className="relative">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Your Books
      </h4>
      
      {books.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No books created yet. Create your first book above.
        </p>
      ) : (
        <div className="relative">
          {/* Navigation Buttons */}
          {showPrevious && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleScroll('up')}
              className="absolute -top-2 left-1/2 -translate-x-1/2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
            >
              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}

          {/* Books List */}
          <div className="space-y-3 max-h-[calc(100vh-24rem)] overflow-hidden">
            <AnimatePresence initial={false}>
              {books.slice(visibleRange.start, visibleRange.end).map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    selectedBook?.id === book.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                  onClick={() => onSelectBook(book)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {book.name}
                      </h3>
                      <p className={`text-sm ${
                        book.balance >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        Balance: {book.balance.toLocaleString()} {book.currency}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBook(book);
                          onAddTransaction();
                        }}
                        className="p-1 text-green-600 hover:bg-green-100 rounded-lg dark:hover:bg-green-900/20"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBook(book);
                          onSubtractTransaction();
                        }}
                        className="p-1 text-red-600 hover:bg-red-100 rounded-lg dark:hover:bg-red-900/20"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteBook(book.id);
                        }}
                        className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Next Button */}
          {showNext && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleScroll('down')}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
            >
              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;