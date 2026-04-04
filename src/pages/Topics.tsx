import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { 
  Scale, Car, Shield, Home as HomeIcon, 
  Briefcase, ShoppingCart, AlertCircle, Loader2 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

const IconResolver = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'ShoppingCart': return <ShoppingCart size={24} />;
    case 'Shield': return <Shield size={24} />;
    case 'Car': return <Car size={24} />;
    case 'Scale': return <Scale size={24} />;
    case 'Briefcase': return <Briefcase size={24} />;
    case 'Home': return <HomeIcon size={24} />;
    default: return <Scale size={24} />;
  }
};

export default function Topics() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('order_index');

        if (error) throw error;
        if (data) setCategories(data);
        
      } catch (err: any) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load legal categories.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-blue-900">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-lg font-medium">Loading Legal Topics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-600">
        <AlertCircle size={48} className="mb-4" />
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Topics Directory</h1>
      <p className="text-lg text-gray-600 mb-10">
        Select a category below to learn about your rights and procedures in plain language.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            to={`/topics/${category.slug}`}
            key={category.id} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex gap-4 items-start group"
          >
            <div className="p-3 bg-blue-50 text-blue-900 rounded-lg group-hover:scale-110 transition-transform">
              <IconResolver iconName={category.icon} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
