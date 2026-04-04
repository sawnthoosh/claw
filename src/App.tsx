import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChatApp from './pages/ChatApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* 1. The Busy Landing Page with 6 Categories */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Authentication Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 3. The Main Chatbot oriented interface */}
        <Route path="/chat" element={<ChatApp />} />

        {/* 4. Redirect any unknown URL back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
