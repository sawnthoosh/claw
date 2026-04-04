import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Shield, HelpCircle } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <Shield size={64} className="mb-6 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Know Your Rights, Protect Yourself
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10">
            Simple, understandable legal information for every citizen. We bridge the gap between complex laws and you.
          </p>
          
          <div className="w-full max-w-2xl relative text-gray-900">
            <input 
              type="text" 
              placeholder="Search for legal topics, cyber rules..." 
              className="w-full px-6 py-4 rounded-full text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all pl-14"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Popular Legal Topics</h2>
          <Link to="/topics" className="text-blue-800 font-semibold hover:underline">View All &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<BookOpen size={32} />}
            title="Consumer Rights"
            desc="Learn about your rights when buying goods or services, and how to file complaints."
          />
          <FeatureCard 
            icon={<Shield size={32} />}
            title="Cyber Laws"
            desc="Understand how to stay safe online and steps to take if you are a victim of cybercrime."
          />
          <FeatureCard 
            icon={<HelpCircle size={32} />}
            title="Basic Citizen Rights"
            desc="Discover fundamental rights guaranteed by the constitution and how to exercise them."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}
