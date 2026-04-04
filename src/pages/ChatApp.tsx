import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, LogOut, Settings, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// STRICT SYSTEM INSTRUCTIONS FOR FORMATTING
const systemInstruction = `You are the Citizen Legal AI Assistant. When a user describes a legal issue or incident, you MUST ALWAYS format your response exactly in this structure using Markdown:

**Applicable Legal Section:** [Briefly state the specific law, act, or section that applies to the incident]

**Your Rights:** [Clearly explain the fundamental rights the citizen has in this specific situation]

**Actionable Steps:** 1. [First step they must take]
2. [Second step]
3. [Third step, etc.]

**Required Documents:** - [List specific documents needed, like ID, receipts, FIR copies, etc.]

Do not deviate from this format. Keep the language simple for an ordinary citizen to understand.`;

const model = genAI?.getGenerativeModel({ model: "gemini-3-flash-preview", systemInstruction });

const FAQ_QUESTIONS = [
  "My landlord refuses to return my security deposit.",
  "I received a defective product online and they won't refund me.",
  "Traffic police confiscated my license without giving a receipt.",
  "Someone is harassing me on social media."
];

export default function ChatApp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([{ role: 'model', text: 'Hello! Please describe your incident, and I will tell you the applicable laws, your rights, the steps to take, and the required documents.' }]);
  
  const userName = localStorage.getItem('userName') || 'Citizen';
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || !genAI) return;

    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      const formattedHistory = chatHistory.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      const chat = model!.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(textToSend);
      setChatHistory(prev => [...prev, { role: 'model', text: result.response.text() }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model', text: "**Error:** I am having trouble connecting to the legal database right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Optional but looks very professional */}
      <div className="w-64 bg-blue-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-blue-800">
          <h2 className="text-xl font-bold flex items-center gap-2"><Bot /> Legal Portal</h2>
          <p className="text-blue-300 text-sm mt-1">Welcome, {userName}</p>
          {isAdmin && <span className="inline-block mt-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Admin Mode</span>}
        </div>
        
        {isAdmin && (
          <div className="p-4 border-b border-blue-800 bg-blue-950">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Tools</h3>
            <button className="flex items-center gap-2 text-sm hover:text-white text-gray-300 w-full p-2 hover:bg-blue-800 rounded">
              <Settings size={16}/> Edit System Prompts
            </button>
          </div>
        )}

        <div className="mt-auto p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white w-full p-2 hover:bg-blue-800 rounded transition">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-blue-900 text-white p-4 flex justify-between items-center shadow-md z-10">
          <h2 className="font-bold">Legal Portal</h2>
          <button onClick={handleLogout}><LogOut size={20}/></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-white">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-5 ${msg.role === 'user' ? 'bg-gray-100 text-gray-900' : 'bg-blue-50 text-blue-900 border border-blue-100'}`}>
                {msg.role === 'model' && <div className="flex items-center gap-2 font-bold mb-2"><Bot size={18}/> Legal Assistant</div>}
                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-blue-50 text-blue-900 border border-blue-100 rounded-2xl p-5 flex items-center gap-3">
                <Loader2 className="animate-spin" size={20} /> Analyzing legal guidelines...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area & FAQs */}
        <div className="bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            {/* FAQ Quick Reply Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {FAQ_QUESTIONS.map((faq, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(faq)}
                  disabled={isLoading}
                  className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full transition border border-gray-200 disabled:opacity-50"
                >
                  {faq}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(message); }} className="relative flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                placeholder="Describe your legal incident..."
                className="w-full bg-gray-100 border-transparent rounded-full pl-6 pr-14 py-4 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="absolute right-2 bg-blue-900 text-white p-2.5 rounded-full hover:bg-blue-800 disabled:opacity-50 transition"
              >
                <Send size={20} />
              </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-3">
              AI can make mistakes. Always consult a licensed professional for serious matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
