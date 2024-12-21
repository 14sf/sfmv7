import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../../types/book';
import { useBooks } from '../../../hooks/useBooks';
import BookList from './BookList';
import CreateBookForm from './CreateBookForm';

const BookSection = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  const handleCreateBook = (data: Omit<Book, 'id' | 'createdAt'>) => {
    const newBook = {
      ...data,
      id: Date.now().toString(),
      createdAt: Date.now()
    };
    addBook(newBook);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Books
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Book
          </motion.button>
        </div>

        <BookList books={books} onSelectBook={() => {}} />

        {showCreateForm && (
          <CreateBookForm
            onSubmit={handleCreateBook}
            onClose={() => setShowCreateForm(false)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default BookSection;