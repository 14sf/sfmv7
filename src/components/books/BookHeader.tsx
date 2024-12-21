import React from 'react';
import { Book } from '../../types/book';
import { Wallet } from 'lucide-react';

interface BookHeaderProps {
  book: Book | null;
}

const BookHeader: React.FC<BookHeaderProps> = ({ book }) => {
  if (!book) return null;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{book.name}</h2>
          <p className={`text-sm font-medium ${
            book.balance >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            Balance: {book.balance.toFixed(2)} SFM
          </p>
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {book.transactions.length} transactions
      </div>
    </div>
  );
};

export default BookHeader;