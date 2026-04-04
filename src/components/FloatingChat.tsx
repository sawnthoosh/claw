import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini SDK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Configure the model with specific instructions for your legal portal
const model = genAI?.getGenerativeModel({ 
  model: "gemini-3-flash-preview",
  systemInstruction: "You are a helpful AI assistant for the Citizen Legal Awareness Portal. Your job is to explain basic legal rights, consumer laws, and traffic rules to ordinary citizens in very simple, easy-to-understand language. Keep answers concise. Always politely remind the user at the end of your first message that you are an AI, not a human lawyer, and they should consult a professional for serious legal advice."
});

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your AI Legal Assistant. How can I help you understand your rights today?' }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!genAI) {
      alert("Missing Gemini API Key! Please add VITE_GEMINI_API_KEY to your .env file.");
      return;
    }

    const userText = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Format history for Gemini API
      const formattedHistory = chatHistory.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // Start a chat session
      const chat = model!.startChat({ history: formattedHistory });
      
      // Send the message
      const result = await chat.sendMessage(userText);
      const botText = result.response.text();

      setChatHistory(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I am having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden h-[500px]">
          {/* Header */}
          <div className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">Legal AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-800 p-1 rounded transition-colors">
              <X size={20} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
              >
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="self-start bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-gray-500">
                <Loader2 size={16} className="animate-spin text-blue-600" />
                <span className="text-xs font-medium">Thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              placeholder="Ask a legal question..." 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading || !message.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-blue-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 z-50 border-4 border-blue-100"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        <span className="font-semibold hidden md:block pr-2">
          {isOpen ? 'Close Chat' : 'Ask Legal AI'}
        </span>
      </button>
    </>
  );
}
