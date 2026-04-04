import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { legalData, Situation } from '../data/legalData';
import { Shield, Scale, MessageSquare, ChevronRight, LogIn, UserPlus, Info, FileText, UserCheck } from 'lucide-react';

const icons: Record<string, any> = { Shield, Scale }; 

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState(legalData[0]);
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Scale className="text-blue-900" size={32} />
          <span className="text-2xl font-black text-gray-900 tracking-tighter">CLAW PORTAL</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/signin')} className="flex items-center gap-2 text-gray-600 font-bold hover:text-blue-900 transition-colors">
            <LogIn size={18} /> Sign In
          </button>
          <button onClick={() => navigate('/signup')} className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2.5 rounded-full font-black shadow-lg hover:bg-blue-800 transition-all">
            <UserPlus size={18} /> Register
          </button>
        </div>
      </nav>

      <div className="bg-blue-900 text-white py-20 px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase">Legal AI Assistant</h1>
          <p className="text-xl text-blue-200 mb-10 font-medium">Instant guidance on laws, rights, and actionable steps for any incident.</p>
          <button 
            onClick={() => navigate('/chat')}
            className="inline-flex items-center gap-3 bg-white text-blue-900 px-12 py-5 rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            <MessageSquare size={32} /> START CHAT NOW
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full py-12 gap-8 px-6">
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Legal Directory</h2>
          {legalData.map((cat) => {
            const Icon = icons[cat.icon] || Shield;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setSelectedSituation(null); }}
                className={`w-full flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${selectedCategory.id === cat.id ? 'bg-blue-50 border-blue-900 shadow-md' : 'bg-white border-transparent hover:border-gray-100'}`}
              >
                <div className={`p-2 rounded-xl ${selectedCategory.id === cat.id ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon size={24} />
                </div>
                <div className="text-left font-black text-gray-900">{cat.name}</div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8">
          {!selectedSituation ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory.situations.map((sit) => (
                <button
                  key={sit.id}
                  onClick={() => setSelectedSituation(sit)}
                  className="p-6 bg-white border border-gray-100 rounded-[2rem] text-left hover:border-blue-900 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-black text-gray-900 mb-2">{sit.title}</h3>
                  <p className="text-gray-500 font-bold text-sm italic mb-4">"{sit.info}"</p>
                  <div className="text-blue-900 font-black text-xs uppercase tracking-widest flex items-center">Action Plan <ChevronRight size={16} /></div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-50">
              <button onClick={() => setSelectedSituation(null)} className="text-gray-400 font-black text-xs uppercase mb-6 tracking-widest">← Back</button>
              <h2 className="text-4xl font-black text-gray-900 mb-6">{selectedSituation.title}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-widest"><Scale size={18}/> Applicable Law</h4>
                    <p className="font-bold text-gray-700 bg-gray-50 p-3 rounded-xl">{selectedSituation.law}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-widest"><UserCheck size={18}/> Your Rights</h4>
                    <ul className="space-y-2">
                      {selectedSituation.rights.map((r, i) => <li key={i} className="text-sm font-bold text-gray-600 bg-gray-50 p-2 rounded-lg border-l-4 border-blue-900">{r}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-widest"><Info size={18}/> Steps</h4>
                    <ul className="space-y-2">
                      {selectedSituation.steps.map((s, i) => <li key={i} className="text-sm font-bold text-gray-600 bg-gray-50 p-2 rounded-lg">{i+1}. {s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
