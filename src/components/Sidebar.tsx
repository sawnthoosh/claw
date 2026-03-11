import { X, Home, BookOpen, HelpCircle, Phone } from 'lucide-react';
import { Category } from '../lib/supabase';
import * as Icons from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (slug: string | null) => void;
}

export function Sidebar({ isOpen, onClose, categories, selectedCategory, onCategorySelect }: SidebarProps) {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.FileText;
    return Icon;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200
        w-64 transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <span className="font-semibold text-gray-900">Menu</span>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1 mb-6">
              <button
                onClick={() => {
                  onCategorySelect(null);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </button>
            </div>

            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Legal Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = getIcon(category.icon);
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategorySelect(category.slug);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium text-sm">Resources</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium text-sm">FAQs</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-medium text-sm">Contact</span>
              </button>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-900 mb-1">Need Help?</p>
              <p className="text-xs text-blue-700 mb-3">Contact legal aid services</p>
              <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Assistance
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
