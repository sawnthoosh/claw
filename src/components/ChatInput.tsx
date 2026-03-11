import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      setIsLoading(true);
      try {
        await onSendMessage(message);
      } finally {
        setIsLoading(false);
      }
      setMessage('');
    }
  };

  const quickQuestions = [
    'What are consumer rights?',
    'How do I report a cyber crime?',
    'What are traffic rules?',
    'Tell me about fundamental rights',
  ];

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message === '' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickQuestion(question)}
              className="text-left text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled || isLoading}
          placeholder="Ask about laws, rights, procedures... Type your question"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !message.trim()}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </form>
  );
}
