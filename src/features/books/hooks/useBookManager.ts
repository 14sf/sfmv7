import { useState } from 'react';
import { Book, Account, Transaction } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useBookManager = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { showToast } = useToast();

  const createBook = (name: string, type: 'personal' | 'business') => {
    const newBook: Book = {
      id: Date.now().toString(),
      name,
      type,
      accounts: [],
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner: 'current-user',
      team: []
    };

    setBooks([...books, newBook]);
    setSelectedBook(newBook);
    showToast('Book created successfully!', 'success');
  };

  const addAccount = (bookId: string, account: Omit<Account, 'id' | 'transactions'>) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        const newAccount: Account = {
          id: Date.now().toString(),
          ...account,
          transactions: []
        };
        return {
          ...book,
          accounts: [...book.accounts, newAccount],
          updatedAt: new Date().toISOString()
        };
      }
      return book;
    }));
    showToast('Account added successfully!', 'success');
  };

  const addTransaction = (bookId: string, accountId: string, transaction: Omit<Transaction, 'id'>) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        return {
          ...book,
          accounts: book.accounts.map(account => {
            if (account.id === accountId) {
              const newTransaction: Transaction = {
                id: Date.now().toString(),
                ...transaction
              };
              const newBalance = account.balance + (
                transaction.type === 'income' ? transaction.amount : -transaction.amount
              );
              return {
                ...account,
                balance: newBalance,
                transactions: [...account.transactions, newTransaction]
              };
            }
            return account;
          }),
          updatedAt: new Date().toISOString()
        };
      }
      return book;
    }));
    showToast('Transaction added successfully!', 'success');
  };

  return {
    books,
    selectedBook,
    setSelectedBook,
    createBook,
    addAccount,
    addTransaction
  };
};