import React from 'react';
import { Toaster } from 'react-hot-toast';
import MainPage from './pages/MainPage';
import { MessengerProvider } from './features/messenger/contexts/MessengerContext';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <MessengerProvider>
        <MainPage />
      </MessengerProvider>
    </>
  );
};

export default App;