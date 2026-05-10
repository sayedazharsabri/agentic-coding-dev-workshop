import React from 'react';
import { Header } from './components/Header';
import { TodoPage } from './pages/TodoPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      <TodoPage />
    </div>
  );
};

export default App;
