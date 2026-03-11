import { LegalTopic } from '../lib/supabase';
import { Clock, Tag } from 'lucide-react';

interface TopicCardProps {
  topic: LegalTopic;
  onClick: () => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
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
    <button
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left w-full"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor(topic.difficulty_level)}`}>
          {topic.difficulty_level}
        </span>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-xs">{topic.reading_time} min read</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {topic.title}
      </h3>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{topic.summary}</p>

      {topic.tags && topic.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-3.5 h-3.5 text-gray-400" />
          {topic.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
