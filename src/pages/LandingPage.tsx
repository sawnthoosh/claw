import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { legalData, Situation } from '../data/legalData';
import { 
  Shield, Scale, MessageSquare, ChevronRight, 
  LogIn, UserPlus, Info, FileText, UserCheck, 
  Home, ShoppingCart, Briefcase 
} from 'lucide-react';

const icons: Record<string, any> = { 
  Shield, Scale, Home, ShoppingCart, UserCheck, Briefcase 
}; 

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState(legalData[0]);
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* 1. NAVIGATION HEADER */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 p-2 rounded-lg text-white">
            <Scale size={24} />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">CLAW Portal</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/signin')} className="flex items-center gap-2 text-gray-600 font-bold hover:text-blue-900 transition-colors">
            <LogIn size={18} /> Sign In
          </button>
          <button onClick={() => navigate('/signup')} className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2.5 rounded-full font-black shadow-lg hover:bg-blue-800 transition-all active:scale-95">
            <UserPlus size={18} /> Register
          </button>
        </div>
      </nav>

      {/* 2. CHATBOT HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-none">
            Legal AI <span className="text-blue-400">Assistant</span>
          </h1>
          <p className="text-xl text-blue-100 mb-12 font-medium max-w-2xl mx-auto">
            Your instant guide to laws, rights, and actionable steps for any legal incident.
          </p>
          <button 
            onClick={() => navigate('/chat')}
            className="inline-flex items-center gap-4 bg-white text-blue-900 px-14 py-6 rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl group"
          >
            <MessageSquare size={32} className="group-hover:rotate-12 transition-transform" /> START CHAT NOW
          </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* 3. INFORMATION DIRECTORY SECTION */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full py-16 gap-12 px-6">
        
        {/* SIDEBAR: Categories */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 px-2">Legal Incident Directory</h2>
          {legalData.map((cat) => {
            const Icon = icons[cat.icon] || Shield;
            const isActive = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setSelectedSituation(null); }}
                className={`w-full flex items-center gap-5 p-5 rounded-[2rem] border-2 transition-all duration-300 text-left ${
                  isActive 
                  ? 'bg-white border-blue-900 shadow-xl translate-x-2' 
                  : 'bg-white border-transparent hover:border-gray-200 grayscale hover:grayscale-0'
                }`}
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

        {/* CONTENT PANEL: Situations or Details */}
        <div className="lg:col-span-8">
          {!selectedSituation ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="col-span-full mb-4">
                <h3 className="text-3xl font-black text-gray-900">{selectedCategory.name} Situations</h3>
                <p className="text-gray-500 font-bold">Select an incident below to see the specific guide.</p>
              </div>
              {selectedCategory.situations.map((sit) => (
                <button
                  key={sit.id}
                  onClick={() => setSelectedSituation(sit)}
                  className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-900 transition-all text-left flex flex-col justify-between h-full"
                >
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">{sit.title}</h3>
                    <p className="text-gray-500 font-bold leading-relaxed line-clamp-3 mb-8 italic">"{sit.info}"</p>
                  </div>
                  <div className="flex items-center font-black text-blue-900 text-sm uppercase tracking-widest">
                    Action Plan <ChevronRight size={20} className="ml-1 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* DETAILED FACT SHEET */
            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-6 duration-500">
              <button 
                onClick={() => setSelectedSituation(null)} 
                className="mb-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-blue-900 transition-colors"
              >
                ← Back to {selectedCategory.name}
              </button>
              
              <h2 className="text-5xl font-black text-gray-900 mb-8 leading-none tracking-tighter">{selectedSituation.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]">
                      <Scale size={20}/> Applicable Law
                    </h4>
                    <p className="text-xl font-bold text-gray-800 leading-tight bg-blue-50 p-5 rounded-2xl border-l-4 border-blue-900">
                      {selectedSituation.law}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]">
                      <UserCheck size={20}/> Your Rights
                    </h4>
                    <ul className="space-y-3">
                      {selectedSituation.rights.map((r, i) => (
                        <li key={i} className="bg-gray-50 p-4 rounded-xl font-bold text-gray-700 border border-gray-100">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]">
                      <Info size={20}/> Steps to Take
                    </h4>
                    <ol className="space-y-5">
                      {selectedSituation.steps.map((s, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span className="bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 shadow-lg">
                            {i+1}
                          </span>
                          <p className="font-bold text-gray-700 leading-snug pt-1">{s}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs font-black text-blue-900 uppercase tracking-[0.2em]">
                      <FileText size={20}/> Required Documents
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedSituation.documents.map((d, i) => (
                        <span key={i} className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-xs font-black">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION CALL TO CHATBOT */}
              <div className="mt-20 bg-blue-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl">
                <div>
                  <h4 className="text-3xl font-black text-white mb-2 tracking-tight">Need deep legal advice?</h4>
                  <p className="text-blue-200 font-bold opacity-80">Our AI is specialized for your unique situation.</p>
                </div>
                <button 
                  onClick={() => navigate('/chat')} 
                  className="bg-white text-blue-900 px-12 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl whitespace-nowrap"
                >
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
