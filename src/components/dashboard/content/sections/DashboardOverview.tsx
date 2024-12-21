import React from 'react';
import { Book } from '../../../../types/book';
import BookSelector from '../../shared/BookSelector';
import BookStats from '../../shared/BookStats';
import TransactionsList from '../../shared/TransactionsList';

interface DashboardOverviewProps {
  selectedBook: Book | null;
  onSelectBook: (book: Book | null) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  selectedBook,
  onSelectBook
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <BookSelector
          selectedBook={selectedBook}
          onSelectBook={onSelectBook}
        />
        {selectedBook && <BookStats book={selectedBook} />}
      </div>
      <TransactionsList selectedBook={selectedBook} />
    </div>
  );
};

export default DashboardOverview;