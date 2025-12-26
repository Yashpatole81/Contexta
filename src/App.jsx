import { useState } from 'react';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="App dark">
      {currentPage === 'landing' ? (
        <Landing onStart={() => setCurrentPage('chat')} />
      ) : (
        <Chat onBack={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}

export default App;
