import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    alert(`Ready to send to Gemini: ${message}`);
    setMessage('');
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">Legal AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-800 p-1 rounded">
              <X size={20} />
            </button>
          </div>
          
          <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            <div className="bg-blue-100 text-blue-900 p-3 rounded-lg rounded-tl-none self-start max-w-[80%] text-sm">
              Hello! I am your AI Legal Assistant. How can I help you understand your rights today?
            </div>
            {/* Future user/bot messages will map here */}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a legal question..." 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors">
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-blue-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 z-50"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        <span className="font-semibold hidden md:block pr-2">
          {isOpen ? 'Close Chat' : 'Ask Legal AI'}
        </span>
      </button>
    </>
  );
}
