import { useState } from 'react';
import { Book } from '../types/book';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

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
  };

  return { 
    books, 
    addBook,
    updateBook,
    deleteBook
  };
};