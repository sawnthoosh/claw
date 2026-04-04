// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { legalData, Situation } from '../data/legalData';
import { Shield, Scale, Home, ShoppingCart, UserCheck, Briefcase, ChevronRight, Info, FileText, LogIn, UserPlus } from 'lucide-react';

const icons: Record<string, any> = { Shield, Scale, Home, ShoppingCart, UserCheck, Briefcase };

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState(legalData[0]);
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dynamic Header with Auth Actions */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 p-2 rounded-lg text-white"><Scale size={24} /></div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">CLAW Portal</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-gray-600 font-bold hover:text-blue-900 transition-colors">
            <LogIn size={18} /> Login
          </button>
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2.5 rounded-full font-black shadow-lg hover:bg-blue-800 transition-transform active:scale-95">
            <UserPlus size={18} /> Register
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Sidebar: Interactive Category Directory */}
        <div className="lg:col-span-4 bg-white border-r border-gray-200 p-6 overflow-y-auto space-y-3">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Incident Categories</h2>
          {legalData.map((cat) => {
            const Icon = icons[cat.icon];
            const isActive = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setSelectedSituation(null); }}
                className={`w-full flex items-center gap-5 p-5 rounded-3xl border-2 transition-all duration-300 text-left ${isActive ? 'bg-blue-50 border-blue-900 shadow-md translate-x-2' : 'bg-white border-transparent hover:border-gray-100'}`}
              >
                <div className={`p-3 rounded-2xl ${isActive ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon size={28} />
                </div>
                <div>
                  <div className={`font-black text-lg ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>{cat.name}</div>
                  <div className="text-xs font-bold text-gray-400">{cat.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Panel: Working Situation Grids and Details */}
        <div className="lg:col-span-8 p-8 md:p-12 overflow-y-auto bg-gray-50">
          {!selectedSituation ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-12">
                <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">{selectedCategory.name} Guide</h1>
                <p className="text-xl text-gray-500 font-medium">Select a specific incident to see laws, rights, and required steps.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategory.situations.map((sit) => (
                  <button
                    key={sit.id}
                    onClick={() => setSelectedSituation(sit)}
                    className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-900 transition-all text-left flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-900">{sit.title}</h3>
                      <p className="text-gray-500 font-bold leading-relaxed line-clamp-3 mb-8 italic">"{sit.info}"</p>
                    </div>
                    <div className="flex items-center font-black text-blue-900 text-sm uppercase tracking-widest">
                      Action Plan <ChevronRight size={20} className="ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Situation Fact Sheet View */
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-6 duration-500">
              <button onClick={() => setSelectedSituation(null)} className="mb-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-blue-900">
                ← Back to {selectedCategory.name}
              </button>
              
              <h2 className="text-5xl font-black text-gray-900 mb-8 leading-none tracking-tighter">{selectedSituation.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]"><Scale size={20}/> Applicable Law</h4>
                    <p className="text-xl font-bold text-gray-800 leading-tight bg-blue-50 p-4 rounded-2xl">{selectedSituation.law}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]"><UserCheck size={20}/> Your Rights</h4>
                    <ul className="space-y-3">
                      {selectedSituation.rights.map((r, i) => (
                        <li key={i} className="bg-gray-50 p-3 rounded-xl font-bold text-gray-700 flex items-start gap-3 border-l-4 border-blue-900">{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]"><Info size={20}/> Steps to Take</h4>
                    <ol className="space-y-4">
                      {selectedSituation.steps.map((s, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span className="bg-blue-900 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0">{i+1}</span>
                          <p className="font-bold text-gray-700 leading-snug">{s}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]"><FileText size={20}/> Required Documents</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSituation.documents.map((d, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-black border border-gray-200">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat CTA Section */}
              <div className="mt-16 bg-blue-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                  <h4 className="text-2xl font-black text-white mb-2">Need a personal legal expert?</h4>
                  <p className="text-blue-200 font-bold">Sign in to use our AI Legal Chatbot for custom advice.</p>
                </div>
                <button onClick={() => navigate('/login')} className="bg-white text-blue-900 px-10 py-4 rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Ask AI Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
