// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { legalData, Situation } from '../data/legalData';
import { Shield, Scale, Home, ShoppingCart, UserCheck, Briefcase, ArrowRight, Info, FileText, ChevronRight } from 'lucide-react';

const icons: Record<string, any> = { Shield, Scale, Home, ShoppingCart, UserCheck, Briefcase };

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState(legalData[0]);
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-blue-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Select Your Situation</h1>
        <p className="text-blue-200">Find factual legal guidance for common incidents</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar: 6 Categories */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-widest text-sm">Legal Categories</h2>
          {legalData.map((cat) => {
            const Icon = icons[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setSelectedSituation(null); }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${selectedCategory.id === cat.id ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-gray-100 hover:border-blue-200'}`}
              >
                <div className={`p-2 rounded-lg ${selectedCategory.id === cat.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Icon size={24} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">{cat.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{cat.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area: 4 Situations & Details */}
        <div className="lg:w-2/3">
          {!selectedSituation ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory.situations.map((sit) => (
                <button
                  key={sit.id}
                  onClick={() => setSelectedSituation(sit)}
                  className="p-6 bg-white border border-gray-200 rounded-2xl text-left hover:shadow-lg transition-shadow group"
                >
                  <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center justify-between">
                    {sit.title} <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-gray-600 text-sm">{sit.info}</p>
                </button>
              ))}
            </div>
          ) : (
            /* Situation Detail View */
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <button onClick={() => setSelectedSituation(null)} className="text-blue-600 mb-6 hover:underline flex items-center gap-2">
                ← Back to {selectedCategory.name}
              </button>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedSituation.title}</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic mb-8 border-l-4 border-blue-500">"{selectedSituation.info}"</p>

              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-2"><Scale size={20}/> Applicable Law</h4>
                  <p className="text-gray-800">{selectedSituation.law}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-2"><UserCheck size={20}/> Your Rights</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {selectedSituation.rights.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-2"><Info size={20}/> Steps to Take</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                      {selectedSituation.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </div>
                </div>

                <div className="bg-blue-900 text-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold flex items-center gap-2 mb-1"><FileText size={20}/> Need personalized help?</h4>
                    <p className="text-blue-200 text-sm">Ask our AI Legal Assistant for a full step-by-step guide.</p>
                  </div>
                  <button onClick={() => navigate('/chat')} className="bg-white text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                    Ask Chatbot
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
