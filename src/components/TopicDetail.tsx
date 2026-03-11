import { LegalTopic, Category } from '../lib/supabase';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface TopicDetailProps {
  topic: LegalTopic;
  category: Category | null;
  onBack: () => void;
}

export function TopicDetail({ topic, category, onBack }: TopicDetailProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to topics</span>
      </button>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {category && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center gap-2 text-blue-100 text-sm mb-2">
              <span>{category.name}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">{topic.title}</h1>
            <div className="flex items-center gap-4 text-blue-100 text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{topic.reading_time} min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{new Date(topic.created_at).toLocaleDateString()}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty_level)}`}>
                {topic.difficulty_level}
              </span>
            </div>
          </div>
        )}

        <div className="px-8 py-6">
          <div className="prose prose-blue max-w-none">
            <div className="text-lg text-gray-700 mb-6 pb-6 border-b border-gray-200">
              {topic.summary}
            </div>
            <div className="markdown-content">
              {topic.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-5 mb-2">{line.substring(4)}</h3>;
                } else if (line.match(/^\d+\./)) {
                  return <li key={index} className="text-gray-700 ml-4 mb-2">{line}</li>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="text-gray-700 ml-4 mb-2">{line.substring(2)}</li>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
                }
              })}
            </div>
          </div>

          {topic.tags && topic.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                {topic.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Disclaimer</h3>
        <p className="text-sm text-blue-800">
          This information is provided for educational purposes only and should not be considered as legal advice.
          For specific legal matters, please consult with a qualified legal professional.
        </p>
      </div>
    </div>
  );
}
