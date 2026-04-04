import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale } from 'lucide-react';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', email.split('@')[0]); // Use email as name
    navigate('/chat'); // Send straight to chat
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center">
        <div className="bg-blue-900 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
          <Scale size={32} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight uppercase">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            required 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
          />
          <input 
            type="password" 
            required 
            placeholder="Password" 
            className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
          />
          <button type="submit" className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all shadow-xl uppercase tracking-widest">
            LOG IN
          </button>
        </form>
        <p className="mt-6 text-sm font-bold text-gray-400">
          No account? <span onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer hover:underline">Register here</span>
        </p>
      </div>
    </div>
  );
}
