import React from 'react';
import { motion } from 'framer-motion';
import { Book as BookIcon } from 'lucide-react';
import { Book } from '../../types';

interface BookListProps {
  books: Book[];
  selectedBook: Book | null;
  onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, selectedBook, onSelectBook }) => {
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
              ? 'bg-blue-50 border-2 border-blue-500'
              : 'bg-white border-2 border-transparent hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              selectedBook?.id === book.id
                ? 'bg-blue-100'
                : 'bg-gray-100'
            }`}>
              <BookIcon className={`w-5 h-5 ${
                selectedBook?.id === book.id
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h3 className={`font-medium ${
                selectedBook?.id === book.id
                  ? 'text-blue-600'
                  : 'text-gray-900'
              }`}>
                {book.name}
              </h3>
              <p className="text-sm text-gray-600">
                {book.type} • {book.accounts.length} accounts
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {books.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No books available. Create your first book to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookList;