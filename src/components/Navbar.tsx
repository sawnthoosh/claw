import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Scale size={28} className="text-blue-800" />
          <span className="text-xl font-bold tracking-tight text-blue-900">CitizenLegal</span>
        </Link>
        <nav className="hidden md:flex gap-6 font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-800 transition-colors">Home</Link>
          <Link to="/topics" className="hover:text-blue-800 transition-colors">Explore Topics</Link>
          <a href="#faq" className="hover:text-blue-800 transition-colors">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
