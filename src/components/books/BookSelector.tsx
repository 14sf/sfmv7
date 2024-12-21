import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Book } from 'lucide-react';
import { Book as BookType } from '../../types/book';

interface BookSelectorProps {
  selectedBook: BookType | null;
  onSelectBook: (book: BookType | null) => void;
  books: BookType[];
}

const BookSelector: React.FC<BookSelectorProps> = ({
  selectedBook,
  onSelectBook,
  books
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleBooks = books.slice(startIndex, startIndex + 3);
  
  const canScrollLeft = startIndex > 0 && books.length > 0;
  const canScrollRight = startIndex + 3 < books.length && books.length > 0;

  const handlePrevious = () => {
    if (canScrollLeft) {
      setStartIndex(prev => Math.max(0, prev - 1));
    }
  };


  const handleNext = () => {
    if (canScrollRight) {
      setStartIndex(prev => Math.min(books.length - 3, prev + 1));
    }
  };

  const handleBookClick = (book: BookType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectBook(book);
  };

  if (books.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500">
          No books available. Create your first book above.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        {/* Left Navigation */}
        <motion.button
          whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
          whileTap={{ scale: canScrollLeft ? 0.9 : 1 }}
          onClick={handlePrevious}
          disabled={!canScrollLeft}
          className={`p-2 rounded-full ${
            canScrollLeft
              ? 'bg-white shadow-lg hover:bg-gray-50'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </motion.button>

        {/* Books Carousel */}
        <div className="flex-1 mx-2 md:mx-4 overflow-hidden">
          <div className="flex gap-4">
            <AnimatePresence mode="popLayout">
              {visibleBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  onClick={(e) => handleBookClick(book, e)}
                  className={`flex-1 p-2 md:p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedBook?.id === book.id
                     ? 'bg-blue-50 border-2 border-blue-500'
                     : 'bg-white border-2 border-transparent hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedBook?.id === book.id
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Book className={`w-5 h-5 ${
                        selectedBook?.id === book.id
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className={`font-medium ${
                        selectedBook?.id === book.id
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {book.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        Balance: {book.balance} {book.currency}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Navigation */}
        <motion.button
          whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
          whileTap={{ scale: canScrollRight ? 0.9 : 1 }}
          onClick={handleNext}
          disabled={!canScrollRight}
          className={`p-2 rounded-full ${
            canScrollRight
              ? 'bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </div>

      {/* Book Count Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(books.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setStartIndex(index * 3)}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.floor(startIndex / 3) === index
                ? 'w-6 bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSelector;