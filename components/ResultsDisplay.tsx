import React from 'react';
import { FinancialData } from '../types';
import { CheckCircle2, XCircle, Building2, Calendar, DollarSign, PieChart, Info, ExternalLink, Globe, History } from 'lucide-react';

interface ResultsDisplayProps {
  data: FinancialData;
  groundingMetadata?: any;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data, groundingMetadata }) => {
  const isSponsorInvolved = data.sponsorInvolved?.toLowerCase() === 'yes';

  // Helper to extract URLs from grounding metadata chunks
  const extractUrls = (): { title: string; url: string }[] => {
    if (!groundingMetadata?.groundingChunks) return [];
    
    const chunks = groundingMetadata.groundingChunks;
    const urls: { title: string; url: string }[] = [];

    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri) {
        urls.push({
          title: chunk.web.title || new URL(chunk.web.uri).hostname,
          url: chunk.web.uri
        });
      }
    });

    return urls;
  };

  const sources = extractUrls();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1 flex items-center gap-2 group">
              {data.websiteUrl && data.websiteUrl !== 'N/A' ? (
                <a 
                  href={data.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-2"
                  title={`Visit ${data.companyName} website`}
                >
                  {data.companyName}
                  <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </a>
              ) : (
                data.companyName
              )}
            </h2>
            <div className="flex items-center gap-2 text-slate-500">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Corporate Structure Analysis</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 px-5 py-3 rounded-full border ${isSponsorInvolved 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
            : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
            {isSponsorInvolved ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold tracking-wider opacity-70">Sponsor Involvement</span>
              <span className="font-bold text-lg leading-none">{data.sponsorInvolved}</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">
          <DataCell 
            label="Sponsor Name" 
            value={data.sponsorName} 
            icon={<Building2 className="w-4 h-4" />}
            highlight={isSponsorInvolved}
          />
          <DataCell 
            label="Date / Timing" 
            value={data.dateTiming} 
            icon={<Calendar className="w-4 h-4" />}
          />
          <DataCell 
            label="Stake" 
            value={data.stake} 
            icon={<PieChart className="w-4 h-4" />}
          />
          <DataCell 
            label="Valuation" 
            value={data.valuation} 
            icon={<DollarSign className="w-4 h-4" />}
          />
          <DataCell 
            label="Investment Amount" 
            value={data.investmentAmount} 
            icon={<DollarSign className="w-4 h-4" />}
          />
          <DataCell 
            label="Platform Type" 
            value={data.platformVsTuckIn} 
            icon={<Info className="w-4 h-4" />}
          />
          <DataCell 
            label="Previous Deals" 
            value={data.previousDeals} 
            icon={<History className="w-4 h-4" />}
            className="md:col-span-2 lg:col-span-3"
          />
        </div>
        
        {/* Full Width Cells */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Deal Background</h3>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-slate-700 leading-relaxed">
              {data.dealBackground}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Ownership Structure (Includes Stake %)</h3>
                <div className="flex items-start gap-3 text-slate-800 font-medium p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <PieChart className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span>{data.ownershipStructure}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Sources Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4 text-slate-900">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-lg">Verified Sources</h3>
        </div>
        
        {sources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors group"
              >
                <div className="bg-slate-100 p-2 rounded-md group-hover:bg-white transition-colors">
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-700 truncate group-hover:text-indigo-700">{source.title}</p>
                  <p className="text-xs text-slate-400 truncate">{source.url}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 italic text-sm">Sources available via internal model knowledge.</p>
        )}
      </div>
    </div>
  );
};

const DataCell: React.FC<{ 
  label: string; 
  value: string; 
  icon: React.ReactNode;
  highlight?: boolean;
  className?: string;
}> = ({ label, value, icon, highlight = false, className = '' }) => (
  <div className={`bg-white p-6 ${highlight ? 'bg-indigo-50/30' : ''} ${className}`}>
    <div className="flex items-center gap-2 text-slate-400 mb-2">
      {icon}
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </div>
    <div className={`text-lg font-medium ${highlight ? 'text-indigo-900' : 'text-slate-900'}`}>
      {value || "N/A"}
    </div>
  </div>
);