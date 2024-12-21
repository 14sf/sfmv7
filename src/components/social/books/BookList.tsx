import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../../types/book';
import { BookOpen } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onSelectBook }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {books.map((book, index) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectBook(book)}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {book.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Balance: {book.balance} {book.currency}
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {books.length === 0 && (
        <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
          No books created yet
        </div>
      )}
    </div>
  );
};

export default BookList;