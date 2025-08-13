import React, { useState } from 'react';
import { Search, TrendingUp, Users, Target } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (data: { pageName: string; industry: string }) => void;
}

export default function AnalysisForm({ onAnalyze }: AnalysisFormProps) {
  const [pageName, setPageName] = useState('');
  const [industry, setIndustry] = useState('');

  const industries = [
    'E-commerce & Retail',
    'Technology & Software',
    'Healthcare & Wellness',
    'Food & Beverage',
    'Fashion & Beauty',
    'Travel & Tourism',
    'Education & Training',
    'Real Estate',
    'Finance & Banking',
    'Entertainment & Media',
    'Automotive',
    'Sports & Fitness',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageName.trim() && industry.trim()) {
      onAnalyze({ pageName: pageName.trim(), industry: industry.trim() });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Free Social Media Analysis
        </h2>
        <p className="text-gray-600 text-lg">
          Get comprehensive insights and optimization recommendations for your social media presence
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="pageName" className="block text-sm font-semibold text-gray-700 mb-2">
            Page/Account Name
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="pageName"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Enter your page or account name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-2">
            Industry/Business Category
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none bg-white"
              required
            >
              <option value="">Select your industry...</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Analyze Now - Free</span>
        </button>
      </form>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">50K+</div>
          <div className="text-sm text-gray-600">Pages Analyzed</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">3x</div>
          <div className="text-sm text-gray-600">Average Growth</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">24/7</div>
          <div className="text-sm text-gray-600">Monitoring</div>
        </div>
      </div>
    </div>
  );
}