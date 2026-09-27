import React, { useState, useEffect, useRef } from 'react';
import IdleScreen from './components/IdleScreen';
import MenuScreen from './components/MenuScreen';
import SurveyScreen from './components/SurveyScreen';
import CameraScreen from './components/CameraScreen';
import ResultScreen from './components/ResultScreen';

export default function App() {
  // 화면 단계: 'idle' -> 'menu' -> 'survey' -> 'camera' -> 'result'
  const [step, setStep] = useState('idle');
  const [language, setLanguage] = useState('ko'); // ko, en, zh, ja
  const [scanType, setScanType] = useState('face'); // face, hand
  const [surveyData, setSurveyData] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  // ★ 무조작 자동 리셋 타이머 (90초)
  const timeoutRef = useRef(null);
  const IDLE_TIMEOUT_MS = 90 * 1000; // 90초

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
    // 대기 화면이 아닐 때만 90초 타이머 동작
    if (step !== 'idle') {
      timeoutRef.current = setTimeout(() => {
        resetToIdle();
      }, IDLE_TIMEOUT_MS);
    }
  };

  useEffect(() => {
    // 터치, 마우스 클릭, 키 입력 감지하여 타이머 갱신
    const events = ['mousedown', 'mousemove', 'touchstart', 'keydown', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, handleUserActivity));

    handleUserActivity();

    return () => {
      events.forEach(evt => window.removeEventListener(evt, handleUserActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [step]);

  // ★ 키오스크 환경: 마우스 우클릭 방지
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden select-none bg-slate-950 font-sans text-white">
      {step === 'idle' && (
        <IdleScreen 
          onStart={(lang) => {
            setLanguage(lang || 'ko');
            setStep('menu');
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