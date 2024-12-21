import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../../types/book';
import { useBooks } from '../../../hooks/useBooks';

interface BookListProps {
  selectedBook: Book | null;
  onSelectBook: (book: Book | null) => void;
}

const BookList: React.FC<BookListProps> = ({
  selectedBook,
  onSelectBook
}) => {
  const { books } = useBooks();

  return (
    <div className="space-y-4">
      {books.map((book, index) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectBook(book)}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            selectedBook?.id === book.id
              ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
              : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-blue-300'
          }`}
        >
          <h3 className="font-medium text-gray-900 dark:text-white">
            {book.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Balance: {book.balance} {book.currency}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default BookList;