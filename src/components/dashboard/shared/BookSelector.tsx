import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../../types/book';

interface BookSelectorProps {
  selectedBook: Book | null;
  onSelectBook: (book: Book | null) => void;
}

const BookSelector: React.FC<BookSelectorProps> = ({
  selectedBook,
  onSelectBook
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Select Book
      </h3>
      <select
        value={selectedBook?.id || ''}
        onChange={(e) => {
          const book = books.find(b => b.id === e.target.value);
          onSelectBook(book || null);
        }}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
      >
        <option value="">Select a book</option>
        {books.map(book => (
          <option key={book.id} value={book.id}>
            {book.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Mock data - replace with actual data source
const books: Book[] = [
  {
    id: '1',
    name: 'Personal Finance',
    type: 'personal',
    currency: 'SFM',
    balance: 1500,
    documents: [],
    transactions: [],
    team: { members: [], invitations: [] },
    createdBy: 'user@example.com',
    createdAt: Date.now()
  }
];

export default BookSelector;