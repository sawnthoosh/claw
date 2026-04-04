// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ChatApp from './pages/ChatApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<ChatApp />} />
    </Routes>
  );
}

export default App;
