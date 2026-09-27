import React, { useState } from 'react';
import { Camera, Hand, ShieldCheck, ArrowRight, Sparkles, X, Pill, Globe } from 'lucide-react';
import logoImg from '../assets/logo.png';

const translations = {
  ko: {
    badge: "실시간 스캔 데이터는 분석 즉시 영구 파기되며 서버에 절대 저장되지 않습니다.",
    title1: "AI로 분석하는 나의 ",
    title2: "건강 & 뷰티 솔루션",
    subtitle: "비접촉 AI 광학 스캔과 맞춤 설문으로 내 몸에 꼭 맞는 최적의 솔루션을 찾아드립니다.",
    faceTitle: "AI 얼굴 종합 분석",
    faceDesc: "안색과 피부 톤을 정밀 스캔하여 활력도를 측정하고 맞춤 이너뷰티와 화장품을 제안합니다.",
    // ★ 1번 수정: 자연스럽고 명확한 바이오 스캔 명칭으로 개선
    handTitle: "손 혈색 & 순환 분석",
    handDesc: "손바닥의 미세 혈색을 정밀 스캔하여 말초 순환과 전신 피로 대사 밸런스를 분석합니다.",
    drugTitle: "약물 안전 확인",
    drugBadge: "안내",
    drugDesc: "복용 중인 약물과의 성분 충돌을 사전에 차단하고 안심 복용 가이드를 제공합니다.",
    startBtn: "화면을 터치하여 시작하기",
    modalTitle: "복용 중인 약물이 있으신가요?",
    modalSub: "AGH 그린건강 약물 상호작용 안심 케어 시스템",
    modalDesc1: "건강기능식품도 약물과의 궁합이 매우 중요합니다. 혈압약, 당뇨약 등 복용 중인 의약품과 특정 영양 성분이 만나면 간·신장 부담이 발생할 수 있습니다.",
    modalDesc2: "AGH AI 키오스크는 신체 스캔 후, 충돌 요소를 사전에 걸러낸 100% 안전한 제품만을 맞춤 선별합니다.",
    modalGuide: "안전한 1:1 매칭을 위해 먼저 생체 스캔 방식을 선택해 주세요",
    modalBtnFace: "📸 얼굴 스캔 시작",
    modalBtnHand: "🖐️ 손 스캔 시작"
  },
  en: {
    badge: "Real-time scan data is permanently destroyed immediately and never stored on the server.",
    title1: "My Personal AI ",
    title2: "Health & Beauty Solution",
    subtitle: "Find optimal solutions tailored for your body with non-contact AI optical scan and personalized survey.",
    faceTitle: "AI Face Analysis",
    faceDesc: "Precisely scans complexion and skin tone to measure vitality and suggests customized inner beauty and cosmetics.",
    handTitle: "Hand Circulation Scan",
    handDesc: "Precisely scans micro-complexion of the palm to evaluate peripheral circulation and vital metabolic balance.",
    drugTitle: "Medication Safety",
    drugBadge: "Guide",
    drugDesc: "Proactively prevents ingredient conflicts with your current medications and provides a safe dosage guide.",
    startBtn: "Touch screen to start",
    modalTitle: "Are you taking any medications?",
    modalSub: "AGH Greenhealth Medication Safety Care System",
    modalDesc1: "Compatibility between supplements and medications is crucial. Mixing specific nutrients with prescription drugs can burden your liver and kidneys.",
    modalDesc2: "AGH AI Kiosk custom-selects 100% safe products by filtering out conflict factors in advance after a body scan.",
    modalGuide: "Please select a scan method first for safe 1:1 matching",
    modalBtnFace: "📸 Start Face Scan",
    modalBtnHand: "🖐️ Start Hand Scan"
  },
  zh: {
    badge: "实时扫描数据在分析后会立即永久销毁，绝不存储在服务器上。",
    title1: "AI分析的专属 ",
    title2: "健康与美容方案",
    subtitle: "通过非接触式AI光学扫描和个性化问卷，为您量身定制最佳方案。",
    faceTitle: "AI 面部综合分析",
    faceDesc: "精准扫描肤色，测量活力指数，并推荐专属内在美容与化妆品。",
    handTitle: "手部微循环血色分析",
    handDesc: "非接触精密扫描手掌微血色，综合测定末梢循环与机体新陈代谢活力。",
    drugTitle: "用药安全确认",
    drugBadge: "指南",
    drugDesc: "提前防止与您正在服用的药物发生成分冲突，提供安心的服用指南。",
    startBtn: "触摸屏幕开始",
    modalTitle: "您正在服用任何药物吗？",
    modalSub: "AGH Greenhealth 药物相互作用安心护理系统",
    modalDesc1: "保健品与药物的搭配非常重要。如果特定营养成分与处方药混合，可能会对肝肾造成负担。",
    modalDesc2: "AGH AI 自助终端在扫描身体后，会提前过滤冲突因素，为您量身定制100%安全的产品。",
    modalGuide: "为了安全的1:1匹配，请先选择生物扫描方式",
    modalBtnFace: "📸 开始面部扫描",
    modalBtnHand: "🖐️ 开始手部扫描"
  },
  ja: {
    badge: "リアルタイムのスキャンデータは分析後すぐに完全に破棄され、保存されません。",
    title1: "AIが分析する私の",
    title2: "健康＆美容ソリューション",
    subtitle: "非接触AI光学スキャンと問診により、あなたの体に最適なソリューションを提案します。",
    faceTitle: "AI 顔総合分析",
    faceDesc: "顔色と肌のトーンを精密にスキャンして活力度を測定し、最適なインナーケアと化粧品を提案します。",
    handTitle: "手の血色＆末梢循環分析",
    handDesc: "手のひらの微小血色を精密スキャンし、末梢の血流循環と代謝バランスを分析します。",
    drugTitle: "お薬の安全確認",
    drugBadge: "案内",
    drugDesc: "服用中のお薬との成分衝突を防ぎ、安心できる服用ガイドを提供します。",
    startBtn: "画面をタッチして開始",
    modalTitle: "現在服用中のお薬はありますか？",
    modalSub: "AGH Greenhealth 薬物相互作用安心ケアシステム",
    modalDesc1: "健康食品もお薬との相性が極めて重要です。特定の栄養素が処方薬と合わさると負担をかける場合があります。",
    modalDesc2: "AGH AIキオスクは、スキャン後に衝突要素を事前に除外した100％安全な製品のみを厳選します。",
    modalGuide: "安全なマッチングのため、まず生体スキャン方式を選択してください",
    modalBtnFace: "📸 顔スキャンを開始",
    modalBtnHand: "🖐️ 手スキャンを開始"
  }
};

export default function IdleScreen({ 
  onStart, 
  onDirectStart, 
  language = 'ko', 
  setLanguage 
}) {
  const [showDrugModal, setShowDrugModal] = useState(false);
  const t = translations[language] || translations.ko;

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-6 md:p-8 select-none">
      
      {/* 4개 국어 언어 토글 */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 flex items-center bg-slate-900/80 border border-slate-700 rounded-full p-1.5 shadow-lg backdrop-blur-sm z-10">
        <Globe className="w-5 h-5 text-slate-400 ml-2 mr-2" />
        <div className="flex gap-1">
          {['ko', 'en', 'zh', 'ja'].map((lang) => (
            <button 
              key={lang}
              onClick={() => setLanguage && setLanguage(lang)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${language === lang ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              {lang === 'ko' ? '한국어' : lang === 'en' ? 'ENG' : lang === 'zh' ? '中文' : '日本語'}
            </button>
          ))}
        </div>
      </div>

      {/* 상단 보안 배지 */}
      <div className="flex items-center gap-2 px-6 py-2 bg-slate-900/90 border border-emerald-500/30 rounded-full text-xs md:text-sm font-medium text-emerald-300 shadow-md mt-16 md:mt-2 max-w-full text-center">
        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 shrink-0" />
        <span className="break-keep">{t.badge}</span>
      </div>

      {/* 로고 */}
      <div className="my-2 p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
        <img src={logoImg} alt="AGH Greenhealth" className="h-16 md:h-20 object-contain rounded-lg drop-shadow-xl" />
      </div>

      {/* 타이틀 */}
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 leading-tight break-keep text-white">
          {t.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">{t.title2}</span>
        </h1>
        <p className="text-sm md:text-lg text-emerald-100/90 font-normal leading-relaxed break-keep">
          {t.subtitle}
        </p>
      </div>

      {/* 3대 기능 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full my-2 px-2">
        <div onClick={onStart} className="bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 rounded-3xl p-5 md:p-6 text-center flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all active:scale-95">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3"><Camera className="w-6 h-6 md:w-7 md:h-7" /></div>
          <h3 className="font-bold text-lg md:text-xl text-white mb-2 whitespace-nowrap">{t.faceTitle}</h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed break-keep">{t.faceDesc}</p>
        </div>

        <div onClick={onStart} className="bg-slate-900/80 border border-teal-500/30 hover:border-teal-400 rounded-3xl p-5 md:p-6 text-center flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all active:scale-95">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-3"><Hand className="w-6 h-6 md:w-7 md:h-7" /></div>
          <h3 className="font-bold text-lg md:text-xl text-white mb-2 whitespace-nowrap">{t.handTitle}</h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed break-keep">{t.handDesc}</p>
        </div>

        <div onClick={() => setShowDrugModal(true)} className="group bg-slate-900/80 border-2 border-cyan-500/40 hover:border-cyan-300 rounded-3xl p-5 md:p-6 text-center flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all active:scale-95">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-cyan-300" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-2 w-full">
            <h3 className="font-bold text-base md:text-lg text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
              {t.drugTitle}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold shrink-0">
              {t.drugBadge}
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed break-keep">{t.drugDesc}</p>
        </div>
      </div>

      {/* 터치 시작 버튼 */}
      <div className="my-2">
        <button onClick={onStart} className="group relative inline-flex items-center gap-4 px-12 py-4 md:px-14 md:py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xl md:text-2xl shadow-2xl hover:from-emerald-400 hover:to-teal-300 active:scale-95 transition-all cursor-pointer">
          <span className="whitespace-nowrap">{t.startBtn}</span>
          <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      <div className="text-xs text-slate-400 tracking-wider pt-1">© 2026 AGH Greenhealth. All Rights Reserved.</div>

      {/* 약물 모달 */}
      {showDrugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-6">
          <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-cyan-500/50 rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowDrugModal(false)} className="absolute top-6 right-6 p-3 text-slate-400 hover:text-white rounded-2xl bg-slate-800/80"><X className="w-7 h-7" /></button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0"><Pill className="w-9 h-9" /></div>
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">{t.modalTitle}</h3>
                <p className="text-sm md:text-base text-cyan-300 mt-1 font-semibold">{t.modalSub}</p>
              </div>
            </div>
            <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 mb-8 space-y-4 text-base md:text-lg text-slate-200 leading-relaxed break-keep">
              <p><strong className="text-white">💡 {t.modalDesc1}</strong></p>
              <p className="text-cyan-200">✓ {t.modalDesc2}</p>
            </div>
            <p className="text-center text-base md:text-lg font-bold text-white mb-4 break-keep">{t.modalGuide}</p>
            <div className="grid grid-cols-2 gap-5">
              <button onClick={() => { setShowDrugModal(false); if (onDirectStart) onDirectStart('face'); else onStart(); }} className="py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-extrabold text-lg shadow-xl active:scale-95 transition-all flex justify-center">
                {t.modalBtnFace}
              </button>
              <button onClick={() => { setShowDrugModal(false); if (onDirectStart) onDirectStart('hand'); else onStart(); }} className="py-5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-extrabold text-lg shadow-xl active:scale-95 transition-all flex justify-center">
                {t.modalBtnHand}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}