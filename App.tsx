import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { SearchSection } from './components/SearchSection';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeCompany } from './services/geminiService';
import { FinancialData } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FinancialData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [groundingMetadata, setGroundingMetadata] = useState<any | null>(null);

  const handleSearch = async (entityName: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setGroundingMetadata(null);

    try {
      const { data: resultData, grounding } = await analyzeCompany(entityName);
      setData(resultData);
      setGroundingMetadata(grounding);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during the analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Financial Data Extraction Agent
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Specialized due diligence research for corporate ownership structures, 
            identifying Private Equity involvement and strategic investments.
          </p>
        </div>

        <SearchSection onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {data && (
          <ResultsDisplay data={data} groundingMetadata={groundingMetadata} />
        )}
      </div>
    </Layout>
  );
};

export default App;