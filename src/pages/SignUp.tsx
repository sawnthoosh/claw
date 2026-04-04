import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration by saving the name to local storage
    localStorage.setItem('userName', name);
    localStorage.setItem('userRole', 'user');
    // Send them straight to the Chatbot after "registering"
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center">
        {/* Icon Header */}
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
          <UserPlus size={32} />
        </div>
        
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight uppercase">Join CLAW</h2>
        <p className="text-gray-500 font-bold mb-8 uppercase text-xs tracking-widest">Create your legal portal account</p>

        <form onSubmit={handleRegister} className="space-y-4 text-left">
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                required 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full p-4 pl-12 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all" 
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                required 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-4 pl-12 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all" 
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                required 
                placeholder="••••••••" 
                className="w-full p-4 pl-12 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all" 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl uppercase tracking-widest mt-4">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-sm font-bold text-gray-400">
          Already a member? <span onClick={() => navigate('/signin')} className="text-blue-600 cursor-pointer hover:underline">Sign In here</span>
        </p>
      </div>
      
      {/* Footer Back Button */}
      <button onClick={() => navigate('/')} className="mt-8 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-blue-900 transition-colors">
        ← Back to Home
      </button>
    </div>
  );
}
