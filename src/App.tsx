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

// Define the three possible screens in our app
type AppView = 'landing' | 'login' | 'chat';

function App() {
  // --- NEW STATE FOR NAVIGATION ---
  const [currentView, setCurrentView] = useState<AppView>('landing');
  
  // --- EXISTING CHAT STATE ---
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
      const apiUrl = import.meta.env.VITE_API_URL || 'https://kuayncnrchbyfmnejuda.supabase.co/functions/v1/dynamic-processor';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1YXluY25yY2hieWZtbmVqdWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNTgyNjksImV4cCI6MjA5MDgzNDI2OX0.6YxvqRlzXtwpNbd9OazSdKL-uTbg-Nwc89ZrQpJENQA'
        },
        body: JSON.stringify({
          messages: [
            ...messagesRef.current.map((msg) => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.content,
            })),
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content || 'Sorry, I could not process your request. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error('Error sending message:', error);

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: `Connection Error: ${error.message}. Please check your Supabase/Vercel configuration.`,
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

  // --- RENDERING LOGIC ---
  
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

  // If view is 'chat', render the main chatbot application
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader
        onMenuClick={() => setIsInfoOpen(true)}
      />

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
