import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Lock, User, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    // Save role to local storage for our app to read
    localStorage.setItem('userRole', isAdmin ? 'admin' : 'user');
    localStorage.setItem('userName', username);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Scale className="mx-auto h-16 w-16 text-blue-900" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Citizen Legal Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your AI Legal Assistant
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          
          {/* Toggle User / Admin */}
          <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isAdmin ? 'bg-white shadow text-blue-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Citizen Login
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isAdmin ? 'bg-blue-900 shadow text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Admin Access
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {isAdmin ? "Admin Username" : "Full Name"}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isAdmin ? <Shield className="h-5 w-5 text-gray-400" /> : <User className="h-5 w-5 text-gray-400" />}
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                  placeholder={isAdmin ? "admin" : "Enter your name"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign In to Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
