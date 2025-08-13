import React from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SocialMetrics Pro</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Advanced social media analytics platform trusted by over 50,000 businesses worldwide. 
              Get actionable insights to grow your social presence.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Real-time Analysis</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Performance Analytics</li>
              <li>Competitor Analysis</li>
              <li>Content Optimization</li>
              <li>Growth Strategies</li>
              <li>Audience Insights</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Support</li>
              <li>API Documentation</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-6 w-6 text-blue-400" />
                <span className="text-2xl font-bold">50K+</span>
              </div>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Award className="h-6 w-6 text-green-400" />
                <span className="text-2xl font-bold">99.9%</span>
              </div>
              <p className="text-gray-400">Uptime</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                <span className="text-2xl font-bold">24/7</span>
              </div>
              <p className="text-gray-400">Support</p>
            </div>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 SocialMetrics Pro. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Professional social media analytics platform for businesses of all sizes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}