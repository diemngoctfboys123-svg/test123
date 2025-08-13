import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Users, Heart, MessageCircle, Share, FileText } from 'lucide-react';

interface AnalysisResultsProps {
  pageName: string;
  industry: string;
  onViewDetailedReport: () => void;
}

export default function AnalysisResults({ pageName, industry, onViewDetailedReport }: AnalysisResultsProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Simulate analysis progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Generate realistic metrics based on industry
  const generateMetrics = () => {
    const baseScore = Math.floor(Math.random() * 20) + 65; // 65-85%
    const engagement = Math.floor(Math.random() * 3) + 2; // 2-5%
    const followers = Math.floor(Math.random() * 50000) + 10000;
    const reach = Math.floor(Math.random() * 100000) + 25000;

    return { baseScore, engagement, followers, reach };
  };

  const metrics = generateMetrics();
  const getStatusColor = (score: number) => {
    if (score >= 80) return { color: 'green', icon: CheckCircle, text: 'Excellent Performance' };
    if (score >= 65) return { color: 'yellow', icon: AlertTriangle, text: 'Needs Optimization' };
    return { color: 'red', icon: XCircle, text: 'High Risk' };
  };

  const status = getStatusColor(metrics.baseScore);
  const StatusIcon = status.icon;

  const recommendations = [
    "Optimize posting schedule for maximum engagement during peak hours",
    "Improve content variety with more video and interactive posts",
    "Enhance hashtag strategy to reach broader audience segments",
    "Implement consistent brand voice across all social platforms"
  ];

  if (!isComplete) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing "{pageName}"
          </h2>
          <p className="text-gray-600">
            Processing {industry} industry benchmarks...
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Analysis Progress</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-4">
            Analyzing engagement patterns, audience demographics, and content performance...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Analysis Complete for "{pageName}"
        </h2>
        <p className="text-gray-600">
          {industry} Industry Analysis
        </p>
      </div>

      {/* Status Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-700">Overall Performance Score</span>
          <span className="text-2xl font-bold text-gray-900">{metrics.baseScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className={`h-4 rounded-full transition-all duration-1000 ${
              status.color === 'green' ? 'bg-green-500' :
              status.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${metrics.baseScore}%` }}
          ></div>
        </div>
        <div className={`flex items-center space-x-2 text-${status.color}-600`}>
          <StatusIcon className="h-5 w-5" />
          <span className="font-semibold">{status.text}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{metrics.followers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{metrics.engagement}%</div>
          <div className="text-sm text-gray-600">Engagement</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">{metrics.reach.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Weekly Reach</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <Share className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">2.4x</div>
          <div className="text-sm text-gray-600">Growth Potential</div>
        </div>
      </div>

      {/* Quick Recommendations */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Optimization Tips</h3>
        <div className="space-y-3">
          {recommendations.slice(0, 3).map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-700">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={onViewDetailedReport}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mx-auto"
        >
          <FileText className="h-5 w-5" />
          <span>Get Detailed Report (Free)</span>
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Includes competitor analysis, content calendar, and growth strategies
        </p>
      </div>
    </div>
  );
}