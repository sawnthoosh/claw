import { Category } from '../lib/supabase';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.FileText;
    return Icon;
  };

  const Icon = getIcon(category.icon);

  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
          <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
    </button>
  );
}
