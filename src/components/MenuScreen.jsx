import React from 'react';
import { Camera, User, Hand, ShieldCheck, ArrowLeft, ArrowRight, HeartPulse, Clock, Globe } from 'lucide-react';
import logoImg from '../assets/logo.png';

const translations = {
  ko: {
    backBtn: "처음으로",
    status: "AI 비접촉 분석 대기",
    titlePre: "원하시는 ",
    titleHighlight: "분석 솔루션",
    titlePost: "을 선택해 주세요",
    subtitle: "비접촉 AI 스캔과 1:1 맞춤 문진으로 고객님의 건강과 피부에 최적화된 처방을 제공합니다.",
    faceTime: "약 1분 소요",
    faceTitle: "AI 얼굴 종합 분석",
    faceSub: "FACE SCAN : HEALTH & BEAUTY",
    faceDesc: "안면 안색과 피부 혈색을 정밀 스캔하여 전신 피로도와 밸런스를 측정하고, 속을 다스리는 맞춤 건강식품과 기능성 화장품을 제안합니다.",
    faceBtn: "얼굴 분석 시작하기",
    handTime: "정밀 건강 문진",
    handTitle: "손 스캔 & 정밀 건강 체크",
    handSub: "HAND SCAN & VITAL HEALTH",
    handDesc: "손바닥의 미세 혈색과 건강 문진표를 결합 분석하여 복용 약물 상호작용까지 안전하게 검증된 필수 영양제를 선별합니다.",
    handBtn: "건강 스캔 시작하기",
    footer: "AGH 그린건강 키오스크는 고객님의 생체 영상 데이터를 서버에 저장하지 않으며 분석 즉시 영구 파기합니다."
  },
  en: {
    backBtn: "Home",
    status: "AI Non-contact Ready",
    titlePre: "Please Select Your ",
    titleHighlight: "Analysis Solution",
    titlePost: "",
    subtitle: "We provide optimized prescriptions for your health and skin with non-contact AI optical scan and personalized survey.",
    faceTime: "~1 Min",
    faceTitle: "AI Face Analysis",
    faceSub: "FACE SCAN : HEALTH & BEAUTY",
    faceDesc: "Precisely scans facial complexion and skin tone to measure fatigue and balance, recommending inner beauty supplements and functional skincare.",
    faceBtn: "Start Face Scan",
    handTime: "Health Survey",
    handTitle: "Hand Scan & Health Check",
    handSub: "HAND SCAN & VITAL HEALTH",
    handDesc: "Analyzes micro-complexion and survey data. Cross-verifies drug interactions to select 100% safe, essential supplements.",
    handBtn: "Start Hand Scan",
    footer: "AGH Greenhealth Kiosk does not store biometric image data on any server; all data is destroyed immediately after analysis."
  },
  zh: {
    backBtn: "返回首页",
    status: "AI非接触分析就绪",
    titlePre: "请选择您需要的 ",
    titleHighlight: "分析方案",
    titlePost: "",
    subtitle: "通过非接触式AI光学扫描与1:1定制问卷，为您量身定制最契合身体状况的健康方案。",
    faceTime: "约需1分钟",
    faceTitle: "AI 面部综合分析",
    faceSub: "FACE SCAN : HEALTH & BEAUTY",
    faceDesc: "精准扫描面部气色与肌肤光泽，测定全身疲劳度与平衡指数，推荐调理体质的营养品与功能性护肤品。",
    faceBtn: "开始面部分析",
    handTime: "精密健康问卷",
    handTitle: "手部扫描与健康检测",
    handSub: "HAND SCAN & VITAL HEALTH",
    handDesc: "结合手掌微血色扫描与健康问卷，安全排查与正在服用药物的相互作用，为您甄选必需营养品。",
    handBtn: "开始健康扫描",
    footer: "AGH Greenhealth 自助终端绝不将生物图像保存在服务器，分析完成后立即彻底销毁。"
  },
  ja: {
    backBtn: "トップへ",
    status: "AI非接触分析待機中",
    titlePre: "ご希望の ",
    titleHighlight: "分析ソリューション",
    titlePost: " を選択してください",
    subtitle: "非接触AI光学スキャンと問診により、お客様の健康とお肌に最適化された処方を提供します。",
    faceTime: "所要時間 約1分",
    faceTitle: "AI 顔総合分析",
    faceSub: "FACE SCAN : HEALTH & BEAUTY",
    faceDesc: "顔色と肌の血色を精密にスキャンして全身の疲労度とバランスを測定し、インナーケア健康食品と化粧品を提案します。",
    faceBtn: "顔分析を開始",
    handTime: "精密健康問診",
    handTitle: "手スキャン＆精密健康チェック",
    handSub: "HAND SCAN & VITAL HEALTH",
    handDesc: "手のひらの微小血色と健康問診を統合分析。服用薬との相互作用も安全に検証し、必須の栄養サプリを厳選します。",
    handBtn: "健康スキャンを開始",
    footer: "AGH Greenhealth キオスクはお客様の生体画像データをサーバーに保存せず、分析直後に完全に破棄します。"
  }
};

export default function MenuScreen({ 
  onSelect, 
  onSelectCourse, 
  onBack, 
  language = 'ko', 
  setLanguage, 
  onLanguageChange 
}) {
  const t = translations[language] || translations.ko;

  // 두 가지 연결 방식(onSelect 또는 onSelectCourse)을 모두 지원
  const handleSelect = (type) => {
    if (onSelectCourse) {
      onSelectCourse(type);
    } else if (onSelect) {
      onSelect(type);
    }
  };

  // 두 가지 언어 변경 방식(onLanguageChange 또는 setLanguage)을 모두 지원
  const handleLanguage = (lang) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    } else if (setLanguage) {
      setLanguage(lang);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white p-6 md:p-10 select-none">
      
      {/* 1. 상단 바: 좌측(버튼) - 중앙(로고) - 우측(언어/상태) */}
      <div className="w-full max-w-6xl grid grid-cols-3 items-center border-b border-emerald-500/20 pb-5">
        
        {/* 좌측: 뒤로가기 */}
        <div className="flex justify-start">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-base whitespace-nowrap">{t.backBtn}</span>
          </button>
        </div>

        {/* 중앙: 로고 */}
        <div className="flex justify-center">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl flex items-center justify-center">
            <img 
              src={logoImg} 
              alt="AGH 그린건강" 
              className="h-16 md:h-20 object-contain rounded drop-shadow-lg" 
            />
          </div>
        </div>

        {/* 우측: 언어 토글 및 상태 */}
        <div className="flex justify-end items-center gap-3">
          <div className="flex items-center bg-slate-900/80 border border-slate-700 rounded-full p-1.5 shadow-md">
            <Globe className="w-4 h-4 text-slate-400 ml-2 mr-1" />
            <div className="flex gap-1">
              {['ko', 'en', 'zh', 'ja'].map((lang) => (
                <button 
                  key={lang}
                  onClick={() => handleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${language === lang ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {lang === 'ko' ? 'KO' : lang === 'en' ? 'EN' : lang === 'zh' ? '中' : '日'}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t.status}
          </div>
        </div>
      </div>

      {/* 2. 중앙 타이틀 */}
      <div className="text-center my-4 max-w-3xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight break-keep">
          {t.titlePre}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
            {t.titleHighlight}
          </span>
          {t.titlePost}
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed break-keep">
          {t.subtitle}
        </p>
      </div>

      {/* 3. 2대 선택 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full my-auto">
        
        {/* 얼굴 종합 분석 카드 */}
        <div 
          onClick={() => handleSelect('face')}
          className="group relative flex flex-col justify-between bg-slate-900/90 border-2 border-emerald-500/40 hover:border-emerald-300 rounded-3xl p-8 backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Camera className="w-8 h-8 text-white opacity-85" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-100" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{t.faceTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📸👤</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap">
                {t.faceTitle}
              </h3>
            </div>
            <div className="text-xs font-semibold text-emerald-400 tracking-wider mb-4 uppercase">
              {t.faceSub}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 break-keep">
              {t.faceDesc}
            </p>
          </div>
          <div className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg group-hover:from-emerald-500 group-hover:to-teal-400 transition-all">
            <span className="whitespace-nowrap">{t.faceBtn}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* 손 스캔 분석 카드 */}
        <div 
          onClick={() => handleSelect('hand')}
          className="group relative flex flex-col justify-between bg-slate-900/90 border-2 border-teal-500/40 hover:border-teal-300 rounded-3xl p-8 backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Hand className="w-9 h-9 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/40 text-teal-300 text-xs font-semibold">
                <HeartPulse className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{t.handTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🖐️</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors whitespace-nowrap">
                {t.handTitle}
              </h3>
            </div>
            <div className="text-xs font-semibold text-teal-400 tracking-wider mb-4 uppercase">
              {t.handSub}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 break-keep">
              {t.handDesc}
            </p>
          </div>
          <div className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg group-hover:from-teal-500 group-hover:to-cyan-400 transition-all">
            <span className="whitespace-nowrap">{t.handBtn}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

      </div>

      {/* 4. 하단 안내 */}
      <div className="w-full max-w-5xl flex items-center justify-center gap-2 pt-4 border-t border-slate-800 text-xs text-slate-300 text-center break-keep">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{t.footer}</span>
      </div>

    </div>
  );
}