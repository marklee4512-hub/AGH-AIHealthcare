import React, { useState, useEffect, useRef } from 'react';
import IdleScreen from './components/IdleScreen';
import MenuScreen from './components/MenuScreen';
import SurveyScreen from './components/SurveyScreen';
import CameraScreen from './components/CameraScreen';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const [step, setStep] = useState('idle');
  const [language, setLanguage] = useState('ko');
  const [scanType, setScanType] = useState('face');
  const [surveyData, setSurveyData] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const timeoutRef = useRef(null);
  const IDLE_TIMEOUT_MS = 90 * 1000;

  const resetToIdle = () => {
    setStep('idle');
    setSurveyData(null);
    setScanResult(null);
    setLanguage('ko');
  };

  const handleUserActivity = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (step !== 'idle') {
      timeoutRef.current = setTimeout(() => {
        resetToIdle();
      }, IDLE_TIMEOUT_MS);
    }
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'touchstart', 'keydown', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, handleUserActivity));
    handleUserActivity();

    return () => {
      events.forEach(evt => window.removeEventListener(evt, handleUserActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [step]);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden select-none bg-slate-950 font-sans text-white">
      {step === 'idle' && (
        <IdleScreen 
          language={language}
          setLanguage={setLanguage}
          onStart={() => setStep('menu')}
          onDirectStart={(type) => {
            setScanType(type);
            setStep('survey');
          }}
        />
      )}

      {step === 'menu' && (
        <MenuScreen 
          language={language}
          onSelectCourse={(type) => {
            setScanType(type);
            setStep('survey');
          }}
          onBack={() => setStep('idle')}
          onLanguageChange={(lang) => setLanguage(lang)}
        />
      )}

      {step === 'survey' && (
        <SurveyScreen 
          language={language}
          scanType={scanType}
          onComplete={(survey) => {
            setSurveyData(survey);
            setStep('camera');
          }}
          onBack={() => setStep('menu')}
        />
      )}

      {step === 'camera' && (
        <CameraScreen 
          language={language}
          scanType={scanType}
          surveyData={surveyData}
          onComplete={(scanRes) => {
            setScanResult({
              ...scanRes,
              survey: surveyData
            });
            setStep('result');
          }}
          onBack={() => setStep('survey')}
        />
      )}

      {step === 'result' && (
        <ResultScreen 
          language={language}
          scanType={scanType}
          result={scanResult}
          onReset={resetToIdle}
        />
      )}
    </div>
  );
}