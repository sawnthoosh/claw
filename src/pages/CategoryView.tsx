import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { TopicCard } from '../components/TopicCard';
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { LegalTopic, Category } from '../lib/supabase';

export default function CategoryView() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [topics, setTopics] = useState<LegalTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1. Fetch the category details based on the slug in the URL
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .single();

        if (categoryError) throw categoryError;
        setCategory(categoryData);

        // 2. Fetch the legal topics that belong to this category
        if (categoryData) {
          const { data: topicsData, error: topicsError } = await supabase
            .from('legal_topics')
            .select('*')
            .eq('category_id', categoryData.id)
            .eq('is_published', true);

          if (topicsError) throw topicsError;
          setTopics(topicsData || []);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err.message);
        setError("Could not load topics for this category.");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-blue-900">
        <Loader2 className="animate-spin mb-4" size={48} />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <AlertCircle size={48} className="mx-auto text-red-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Category not found"}</h2>
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
            <div key={topic.id} className="h-full">
              {/* Using the TopicCard component you already have in src/components */}
              <TopicCard 
                topic={topic} 
                onClick={() => alert(`In the next step, this will navigate to: /article/${topic.slug}`)} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
