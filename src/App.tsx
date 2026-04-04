import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { InfoPanel } from './components/InfoPanel';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

type AppView = 'landing' | 'login' | 'chat';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = async (userMessage: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      content: userMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 1. Get the key directly from Vercel's environment variables
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Missing VITE_GEMINI_API_KEY in Vercel settings!");
      }

      // 2. Call Google Gemini directly!
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are CLAW, an expert AI legal assistant. Answer this user query clearly and professionally: \n\nQuery: ${userMessage}` }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
         throw new Error(data.error.message);
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: data.candidates[0].content.parts[0].text || 'Sorry, I could not generate a response.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error('Error sending message:', error);

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: `🚨 ERROR: ${error.message}`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentView('login')} />;
  }

  if (currentView === 'login') {
    return (
      <LoginPage 
        onLogin={() => setCurrentView('chat')} 
        onBack={() => setCurrentView('landing')} 
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader onMenuClick={() => setIsInfoOpen(true)} />

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col justify-between">
            <ChatContainer messages={messages} isLoading={isLoading} />
          </div>
        </div>

        <div className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
            {messages.length > 0 && (
              <div className="text-center mt-3">
                <button
                  onClick={handleClearChat}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <InfoPanel isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}

export default App;
