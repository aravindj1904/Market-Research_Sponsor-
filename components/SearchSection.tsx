import React, { useState } from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
        <div className="relative flex items-center bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 p-2">
          <Search className="w-6 h-6 text-slate-400 ml-3" />
          <input
            type="text"
            className="flex-1 px-4 py-3 text-lg text-slate-800 placeholder-slate-400 outline-none bg-transparent"
            placeholder="Enter entity name (e.g. ServiceTitan, Panera Bread)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 
              ${isLoading || !query.trim() 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg active:transform active:scale-95'
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing</span>
              </>
            ) : (
              <>
                <span>Research</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
         <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
           Supported: Private Equity • Strategic Investments • Exits
         </p>
      </div>
    </div>
  );
};