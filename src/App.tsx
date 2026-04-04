import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingChat from './components/FloatingChat';
import Home from './pages/Home';
import Topics from './pages/Topics';
import CategoryView from './pages/CategoryView'; // <-- Add this import

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          {/* Add the dynamic route for individual categories */}
          <Route path="/topics/:slug" element={<CategoryView />} />
        </Routes>
      </main>

      <FloatingChat />
    </div>
  );
}

export default App;
