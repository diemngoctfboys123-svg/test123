import React from 'react';
import { CheckCircle, Mail, FileText, TrendingUp, Home } from 'lucide-react';

interface CompletionScreenProps {
  contact: string;
  onBackToHome: () => void;
}

export default function CompletionScreen({ contact, onBackToHome }: CompletionScreenProps) {
  const isEmail = contact.includes('@');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Analysis Complete!
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Thank you for using SocialMetrics Pro
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Mail className="h-6 w-6 text-green-600" />
          <span className="text-lg font-semibold text-gray-800">
            Report Delivery Confirmed
          </span>
        </div>
        <p className="text-gray-700 mb-3">
          Your comprehensive social media analysis report is being processed and will be delivered to:
        </p>
        <div className="bg-white p-3 rounded-lg inline-block">
          <span className="font-mono font-semibold text-blue-600">{contact}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border-2 border-green-200 p-4 rounded-lg">
          <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 mb-1">Detailed Report</h3>
          <p className="text-sm text-gray-600">Complete analysis with actionable insights</p>
        </div>
        <div className="bg-white border-2 border-blue-200 p-4 rounded-lg">
          <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 mb-1">Growth Strategy</h3>
          <p className="text-sm text-gray-600">Personalized recommendations for improvement</p>
        </div>
        <div className="bg-white border-2 border-purple-200 p-4 rounded-lg">
          <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 mb-1">Ongoing Support</h3>
          <p className="text-sm text-gray-600">Monthly tips and industry updates</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8">
        <p className="text-yellow-800 font-medium mb-2">⏰ Expected Delivery Time</p>
        <p className="text-yellow-700">
          Your report will arrive within <strong>5-10 minutes</strong>. 
          Please check your {isEmail ? 'email inbox and spam folder' : 'text messages'}.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={onBackToHome}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
        >
          <Home className="h-5 w-5" />
          <span>Analyze Another Page</span>
        </button>
        
        <p className="text-sm text-gray-500">
          Want to analyze more pages? Our platform supports unlimited free analyses.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          🔒 Your data is secure and will never be shared. 
          This analysis was generated using advanced AI algorithms and industry benchmarks.
        </p>
      </div>
    </div>
  );
}