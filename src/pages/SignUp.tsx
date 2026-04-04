import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 text-center">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"><UserPlus size={32} /></div>
        <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Join CLAW</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
          <input type="email" required placeholder="Email" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
          <input type="password" required placeholder="Create Password" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl">CREATE ACCOUNT</button>
        </form>
        <p className="mt-6 text-sm font-bold text-gray-400">Already a member? <span onClick={() => navigate('/signin')} className="text-blue-600 cursor-pointer">Log In</span></p>
      </div>
    </div>
  );
}
