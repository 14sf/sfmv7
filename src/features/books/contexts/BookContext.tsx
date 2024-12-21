import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, Account, Transaction } from '../types';

interface BookContextType {
  books: Book[];
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addTransaction: (bookId: string, accountId: string, transaction: Omit<Transaction, 'id'>) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const addBook = (book: Book) => {
    setBooks(prev => [...prev, book]);
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updates } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
    if (selectedBook?.id === id) {
      setSelectedBook(null);
    }
  };

  const addTransaction = (bookId: string, accountId: string, transaction: Omit<Transaction, 'id'>) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        return {
          ...book,
          accounts: book.accounts.map(account => {
            if (account.id === accountId) {
              const newTransaction: Transaction = {
                id: Date.now().toString(),
                ...transaction
              };
              return {
                ...account,
                balance: account.balance + (transaction.type === 'income' ? transaction.amount : -transaction.amount),
                transactions: [...account.transactions, newTransaction]
              };
            }
            return account;
          })
        };
      }
      return book;
    }));
  };

  return (
    <BookContext.Provider value={{
      books,
      selectedBook,
      setSelectedBook,
      addBook,
      updateBook,
      deleteBook,
      addTransaction
    }}>
      {children}
    </BookContext.Provider>
  );
};