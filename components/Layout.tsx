import React, { ReactNode } from 'react';
import { LineChart, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">DueDiligence AI</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">API</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LineChart className="w-4 h-4" />
            <span>Powered by Gemini 2.5 Flash & Google Search Grounding</span>
          </div>
          <p>&copy; {new Date().getFullYear()} DueDiligence AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};