import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, legalTopics } from '../data/legalData';
import { ArrowLeft, BookOpen, Clock, AlertCircle } from 'lucide-react';

export default function CategoryView() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the exact category from our local data
  const category = categories.find(c => c.slug === slug);
  
  // Filter the topics that belong to this category
  const topics = legalTopics.filter(t => t.categorySlug === slug);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <AlertCircle size={48} className="mx-auto text-red-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
        <Link to="/topics" className="text-blue-600 hover:underline">Return to Topics Directory</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/topics" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft size={20} className="mr-2" /> Back to Directory
      </Link>
      
      <div className="bg-blue-50 rounded-2xl p-8 mb-10 border border-blue-100">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{category.name}</h1>
        <p className="text-lg text-blue-800 max-w-3xl">{category.description}</p>
      </div>

      {topics.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">No articles have been published in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 transition-colors flex flex-col h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{topic.summary}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen size={16} /> {topic.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {topic.timeToRead}
                  </span>
                </div>
                <button 
                  onClick={() => alert(`This would open the full text for: ${topic.title}`)}
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  Read Article &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
