import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, BookOpen, Plus, Users, FileText } from 'lucide-react';
import { Book as BookType } from '../../types/book';
import BookList from './BookList';
import BookDetails from './BookDetails';
import TeamManagement from './TeamManagement';
import { useToast } from '../../hooks/useToast';

const BookDashboard: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const { showToast } = useToast();

  const handleAddBook = () => {
    setShowAddBook(true);
  };

  const handleSelectBook = (book: BookType) => {
    setSelectedBook(book);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SFMBook
              </h1>
              <p className="text-sm text-gray-600">
                Manage your books and transactions
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddBook}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Book
          </motion.button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <BookList
              selectedBook={selectedBook}
              onSelectBook={handleSelectBook}
            />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {selectedBook ? (
              <BookDetails book={selectedBook} />
            ) : (
              <div className="text-center py-12">
                <Book className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Book Selected
                </h3>
                <p className="text-gray-500">
                  Select a book from the list or create a new one
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDashboard;