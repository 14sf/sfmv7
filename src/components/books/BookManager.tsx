import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types/book';
import BookSelector from './BookSelector';
import BookDetails from './BookDetails';
import CreateBookForm from './CreateBookForm';
import { useBooks } from '../../hooks/useBooks';
import { useToast } from '../../hooks/useToast';
import { useTeamAccess } from '../../hooks/useTeamAccess';

const BookManager = () => {
  const [showBookForm, setShowBookForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { books, addBook, updateBook } = useBooks();
  const { showToast } = useToast();
  const access = useTeamAccess(selectedBook);

  const handleCreateBook = (data: { name: string; currency: string; category: string }) => {
    const newBook: Book = {
      id: Date.now().toString(),
      name: data.name.trim(),
      type: data.category,
      currency: data.currency,
      balance: 0,
      documents: [],
      transactions: [],
      team: {
        members: [
          {
            id: '1',
            email: 'user@example.com',
            name: 'Current User',
            role: 'owner',
            status: 'active',
            joinedAt: Date.now()
          }
        ],
        invitations: []
      },
      createdBy: 'user@example.com',
      createdAt: Date.now()
    };

    addBook(newBook);
    setSelectedBook(newBook);
    setShowBookForm(false);
    showToast(`Book "${data.name}" created successfully!`, 'success');
  };

  const handleSelectBook = (book: Book | null) => {
    setSelectedBook(book);
  };

  const handleAddTransaction = () => {
    if (!selectedBook || !access.canCreateTransaction) return;
    // Add transaction logic here
  };

  const handleSubtractTransaction = () => {
    if (!selectedBook || !access.canCreateTransaction) return;
    // Subtract transaction logic here
  };

  const handleUploadDocument = () => {
    if (!selectedBook || !access.canCreateTransaction) return;
    // Upload document logic here
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Create Book Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowBookForm(true)}
        className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
      >
        <span className="text-sm md:text-base text-gray-600 dark:text-gray-400">Create New Book</span>
      </motion.button>

      {/* Book Selector */}
      <BookSelector
        selectedBook={selectedBook}
        onSelectBook={handleSelectBook}
        books={books}
      />

      {/* Selected Book Card */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onAddTransaction={handleAddTransaction}
          onSubtractTransaction={handleSubtractTransaction}
          onUploadDocument={handleUploadDocument}
        />
      )}

      {/* Create Book Form */}
      {showBookForm && (
        <CreateBookForm
          onSubmit={handleCreateBook}
          onClose={() => setShowBookForm(false)}
        />
      )}
    </div>
  );
};

export default BookManager;