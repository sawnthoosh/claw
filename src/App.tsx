import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChatApp from './pages/ChatApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Routes>
        {/* 1. The main Landing Page with Categories and Direct Chat Button */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Authentication Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 3. The Main Chatbot Interface */}
        <Route path="/chat" element={<ChatApp />} />

        {/* 4. Catch-all: Redirect any broken links back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
