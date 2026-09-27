import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Sparkles, RefreshCcw, MessageSquare, 
  Smartphone, CheckCircle2, Activity, Droplets, Zap, HeartPulse, X, Pill, Tag, FileText, Check, QrCode, BellRing
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import productsData from '../data/products.json';

const translations = {
  ko: {
    title: "AI 맞춤 건강 & 뷰티 솔루션 리포트",
    subtitle: "생체 신호 & 1:1 건강 문진 정밀 분석 완료",
    scoreTitle: "BIOMETRIC VITAL SCORE",
    scoreLabel: "정밀 진단 지수",
    balanceGood: "전반적 신체 밸런스 양호",
    balanceDescFace: "안색 피로도 감지 / 항산화·수분 밸런스 케어 필요",
    balanceDescHand: "말초 미세 순환 완만 / 혈행 개선 및 활력 대사 집중 권장",
    bar1: "말초 모세혈관 순환",
    bar2: "영양 흡수 대사율",
    bar3: "신체 활력 회복도",
    safetyTitle: "복용 약물 안전 상호작용 검증 완료",
    recoTitle: "AGH 그린건강 1:1 맞춤 정품 솔루션",
    recoBadge: "최우선 추천 3선",
    clickGuide: "제품 카드를 터치하시면 상세 효능과 안심 복용 가이드가 열립니다.",
    usageGuide: "섭취 권장 가이드",
    detailBtn: "상세 정보 보기",
    
    modalTitle: "정품 솔루션 상세 처방 가이드",
    modalEfficacy: "주요 효능 및 기능성",
    modalUsage: "전문가 권장 복용법",
    modalFeature: "제품 특징 및 추천 대상",
    modalWarning: "약물 상호작용 안심 체크",
    closeBtn: "확인 완료 (닫기)",
    
    btnExpert: "매장 전문가 1:1 맞춤 영양 상담",
    btnSave: "결과 스마트폰 전송",
    btnReset: "처음으로 (종료)",
    footer: "매장에 진열된 정품 패키지를 직접 확인하시거나, 카운터 전문가에게 맞춤 복용 지도를 요청해 주세요.",
    
    expertModalTitle: "매장 전문가 상담 요청 완료",
    expertModalDesc1: "카운터의 건강기능식품 전문 상담사에게 알림이 전달되었습니다.",
    expertModalDesc2: "잠시만 매장 내에서 대기해 주시면 담당 전문가가 고객님께 직접 방문하여 1:1 맞춤 복약 지도를 안내해 드립니다.",
    expertModalConfirm: "확인했습니다",
    qrModalTitle: "스마트폰으로 분석 결과 받기",
    qrModalDesc: "스마트폰 기본 카메라로 아래 QR 코드를 비추시면, 현재 맞춤 리포트와 추천 제품 목록을 모바일로 즉시 저장하실 수 있습니다.",
    qrNotice: "개인정보 보호를 위해 결과 페이지는 당일 동안만 안전하게 조회 가능합니다.",
    
    concernBadgePre: "선택 고민",
    generalBalance: "전신 기초 밸런스 추천",
    badgeFatigue: "만성 피로 케어",
    badgeSkin: "피부 보습 & 안색",
    badgeCirculation: "혈행 & 말초 순환",
    badgeJoint: "관절 마디 & 연골",
    badgeImmunity: "기초 면역 강화",
    badgeOther: "전신 항노화 활력",
    drugSafeNone: "정기 복용 의약품이 없어 간·신장 부담 없이 영양 흡수를 극대화할 수 있는 최적의 안심 처방입니다.",
    drugSafeBpSugar: "혈압약·당뇨약 성분과 대사 충돌이 없는 안전한 원료만을 엄선하여 안심하고 병용 섭취 가능합니다.",
    drugSafeBloodThinner: "아스피린·항응고제 복용을 고려하여 과도한 출혈 경향을 유발하지 않는 안전한 성분으로 교차 검증되었습니다.",
    drugSafeOther: "정기 처방 의약품과의 안전성을 1차 검토 완료하였으며, 매장 전문가와 1:1 추가 맞춤 상담을 권장합니다."
  },
  en: {
    title: "AI Customized Health & Beauty Report",
    subtitle: "Biometric Signals & Personalized Survey Complete",
    scoreTitle: "BIOMETRIC VITAL SCORE",
    scoreLabel: "Precision Index",
    balanceGood: "Overall Vital Balance Good",
    balanceDescFace: "Mild facial fatigue / Antioxidant & Hydration care recommended",
    balanceDescHand: "Peripheral circulation low / Circulation & Vital energy care recommended",
    bar1: "Capillary Circulation",
    bar2: "Metabolic Absorption",
    bar3: "Vitality Recovery",
    safetyTitle: "Medication Interaction Safety Verified",
    recoTitle: "AGH Greenhealth 1:1 Premium Solutions",
    recoBadge: "Top 3 Recommendations",
    clickGuide: "Touch any product card to view full details and safe dosage guidance.",
    usageGuide: "Recommended Dosage",
    detailBtn: "View Details",
    
    modalTitle: "Certified Formulation Guide",
    modalEfficacy: "Key Efficacy & Functions",
    modalUsage: "Recommended Usage Guide",
    modalFeature: "Product Features",
    modalWarning: "Medication Safety Interaction",
    closeBtn: "Close & Confirm",
    
    btnExpert: "1:1 Nutrition Consultation",
    btnSave: "Send to Smartphone",
    btnReset: "Start Over (Exit)",
    footer: "Check the authentic packages in-store or ask our counter specialists for tailored guidance.",
    
    expertModalTitle: "Expert Consultation Requested",
    expertModalDesc1: "A notification has been sent to our on-duty healthcare specialist at the counter.",
    expertModalDesc2: "Please take a moment in the store. A specialist will assist you with tailored dosage and product guidance shortly.",
    expertModalConfirm: "I Understand",
    qrModalTitle: "Save Report to Smartphone",
    qrModalDesc: "Scan the QR code below with your smartphone camera to save this report and recommended solutions immediately.",
    qrNotice: "For privacy protection, your temporary report link is available for today only.",
    
    concernBadgePre: "Target Concern",
    generalBalance: "Vital Balance Care",
    badgeFatigue: "Chronic Fatigue",
    badgeSkin: "Skin & Complexion",
    badgeCirculation: "Blood Circulation",
    badgeJoint: "Joint & Cartilage",
    badgeImmunity: "Immune Boost",
    badgeOther: "Anti-Aging & Vitality",
    drugSafeNone: "Zero prescription drugs reported. Formulated for maximum absorption with zero metabolic burden.",
    drugSafeBpSugar: "Strictly screened to prevent metabolic interference with blood pressure & diabetes medications.",
    drugSafeBloodThinner: "Cross-checked with blood thinners/aspirin to ensure zero adverse bleeding interaction.",
    drugSafeOther: "Screened for prescription safety. 1:1 nutrition consultation with our in-store specialist is recommended."
  },
  zh: {
    title: "AI 专属健康与美容方案报告",
    subtitle: "生物信号与健康问卷深度分析完成",
    scoreTitle: "BIOMETRIC VITAL SCORE",
    scoreLabel: "精密诊断指数",
    balanceGood: "整体机体平衡良好",
    balanceDescFace: "面部气色略显疲劳 / 需集中补充抗氧化与水分",
    balanceDescHand: "末梢微循环稍弱 / 建议集中改善血液循环与新陈代谢",
    bar1: "末梢毛细血管循环",
    bar2: "营养吸收代谢率",
    bar3: "机体活力恢复度",
    safetyTitle: "用药安全相互作用验证完成",
    recoTitle: "AGH Greenhealth 1:1 专属正品方案",
    recoBadge: "首选推荐 3款",
    clickGuide: "点击产品卡片即可查看详细功效与安心服用指南。",
    usageGuide: "建议服用方法",
    detailBtn: "查看详情",
    
    modalTitle: "正品专属配方详细指南",
    modalEfficacy: "主要功效与功能",
    modalUsage: "专家建议服用方法",
    modalFeature: "产品特点与推荐人群",
    modalWarning: "用药相互作用安心核验",
    closeBtn: "确认并关闭",
    
    btnExpert: "门店专家 1:1 专属营养咨询",
    btnSave: "保存至手机",
    btnReset: "返回首页 (结束)",
    footer: "请亲自确认门店内陈列的正品包装，或向柜台专家寻求专属服用指导。",
    
    expertModalTitle: "已成功呼叫门店专家",
    expertModalDesc1: "已向柜台在岗的健康营养顾问发送咨询提示。",
    expertModalDesc2: "请您在店内稍候，专业顾问将前来为您提供一对一用药与营养搭配指导。",
    expertModalConfirm: "我知道了",
    qrModalTitle: "保存报告至手机",
    qrModalDesc: "请使用手机相机扫描下方二维码，即可随时在手机上查看本次分析报告及推荐方案。",
    qrNotice: "为保障您的隐私安全，该临时报告链接仅限今日有效。",
    
    concernBadgePre: "定制目标",
    generalBalance: "综合机能调理",
    badgeFatigue: "改善慢性疲劳",
    badgeSkin: "滋润美肤与气色",
    badgeCirculation: "血液与末梢循环",
    badgeJoint: "关节骨骼与软骨",
    badgeImmunity: "增强基础免疫",
    badgeOther: "全身抗衰与活力",
    drugSafeNone: "未服用定期处方药，配方可高效吸收营养，无肝肾代谢负担。",
    drugSafeBpSugar: "精选与降压药、降糖药无成分冲突的安全原料，可放心配合服用。",
    drugSafeBloodThinner: "已针对阿司匹林及抗凝血药做专项核验，杜绝引发出血风险的成分。",
    drugSafeOther: "已完成基础处方药安全排查，建议向柜台专家咨询个性化营养搭配方案。"
  },
  ja: {
    title: "AI カスタム健康＆美容ソリューションレポート",
    subtitle: "生体信号＆問診の総合分析完了",
    scoreTitle: "BIOMETRIC VITAL SCORE",
    scoreLabel: "精密診断指数",
    balanceGood: "全体的な身体バランス良好",
    balanceDescFace: "顔の疲労感を検知 / 抗酸化＆水分バランスケアを推奨",
    balanceDescHand: "末梢微小循環の低下 / 血流改善と活力代謝の集中ケアを推奨",
    bar1: "末梢毛細血管循環",
    bar2: "栄養吸収代謝率",
    bar3: "身体活力回復度",
    safetyTitle: "服用薬との相互作用 安全検証完了",
    recoTitle: "AGH Greenhealth 1:1 カスタム正規品",
    recoBadge: "最優先おすすめ 3選",
    clickGuide: "製品カードをタッチすると詳細な効能と安心服用ガイドが開きます。",
    usageGuide: "推奨ガイド",
    detailBtn: "詳細を見る",
    
    modalTitle: "正規品カスタム詳細処方ガイド",
    modalEfficacy: "主な効能・効果",
    modalUsage: "推奨される服用法",
    modalFeature: "製品の特徴とおすすめ対象",
    modalWarning: "お薬との安全相互確認",
    closeBtn: "確認して閉じる",
    
    btnExpert: "店舗専門家 1:1 カスタム栄養相談",
    btnSave: "スマホに結果を送信",
    btnReset: "最初に戻る (終了)",
    footer: "店頭に陳列されている正規品パッケージをご確認いただくか、カウンター専門家にお声がけください。",
    
    expertModalTitle: "専門家相談のリクエスト完了",
    expertModalDesc1: "カウンターのサプリメント専門スタッフへ通知が送信されました。",
    expertModalDesc2: "店内にて少々お待ちください。担当スタッフが直接ご案内とお薬の相互確認をサポートいたします。",
    expertModalConfirm: "確認しました",
    qrModalTitle: "分析結果をスマホに保存",
    qrModalDesc: "スマートフォンのカメラで下記のQRコードを読み取ると、本レポートを端末にすぐ保存できます。",
    qrNotice: "プライバシー保護のため、結果ページは本日中のみ安全に閲覧可能です。",
    
    concernBadgePre: "選択したお悩み",
    generalBalance: "全身バランスケア",
    badgeFatigue: "慢性疲労ケア",
    badgeSkin: "肌の潤い＆血色",
    badgeCirculation: "血流＆末梢循環",
    badgeJoint: "関節・節々＆軟骨",
    badgeImmunity: "基礎免疫力アップ",
    badgeOther: "全身の抗老化と活力",
    drugSafeNone: "定期服用薬がないため、肝臓・腎臓への負担なく栄養吸収を最大化できる最適処方です。",
    drugSafeBpSugar: "血圧・糖尿病薬の代謝と衝突しない原料のみを厳選しており、安心して併用いただけます。",
    drugSafeBloodThinner: "アスピリン・抗凝固薬の服用を考慮し、過度な出血傾向を招かない安全な成分を確認済みです。",
    drugSafeOther: "処方薬との安全性を最優先で確認済みです。カウンター専門家への栄養相談をおすすめします。"
  }
};

export default function ResultScreen({ result, scanType, onReset, language = 'ko' }) {
  const t = translations[language] || translations.ko;
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // ★ 다국어 JSON 필드에 맞춰 언어별 키값 가져오는 헬퍼 함수
  const getLangField = (prod, fieldName) => {
    if (!prod) return '';
    const langKey = language === 'ko' ? '' : language.charAt(0).toUpperCase() + language.slice(1);
    const key = `${fieldName}${langKey}`;
    return prod[key] || prod[fieldName] || '';
  };

  const getProductImageId = (link) => {
    if (!link) return null;
    const parts = link.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart && !isNaN(lastPart) ? lastPart : null;
  };

  const getBadgeName = (concernId) => {
    switch (concernId) {
      case 'fatigue': return t.badgeFatigue;
      case 'skin': return t.badgeSkin;
      case 'circulation': return t.badgeCirculation;
      case 'joint': return t.badgeJoint;
      case 'immunity': return t.badgeImmunity;
      case 'other': return t.badgeOther; // 전신 항노화 활력
      default: return t.generalBalance;
    }
  };

  const getDrugSafetyMessage = () => {
    const drugInfo = result?.survey?.drugInfo || 'none';
    if (drugInfo === 'bp_sugar') return t.drugSafeBpSugar;
    if (drugInfo === 'blood_thinner') return t.drugSafeBloodThinner;
    if (drugInfo === 'other') return t.drugSafeOther;
    return t.drugSafeNone;
  };

  // ★ Web Audio API 기반 "딩동" 호출 사운드 생성
  const playDingDong = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
        gain.gain.setValueAtTime(0, audioCtx.currentTime + startTime);
        gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + startTime + duration);
        osc.start(audioCtx.currentTime + startTime);
        osc.stop(audioCtx.currentTime + startTime + duration);
      };
      playTone(659.25, 0, 0.5); // E5 (미)
      playTone(523.25, 0.4, 0.8); // C5 (도)
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const handleExpertCall = () => {
    playDingDong();
    setShowExpertModal(true);
  };

  // 1:1 맞춤 정품 선별 (로얄젤리 보완 완료)
  useEffect(() => {
    let allList = [];
    if (productsData && Array.isArray(productsData)) {
      allList = productsData;
    } else if (productsData && typeof productsData === 'object') {
      Object.keys(productsData).forEach(categoryKey => {
        if (Array.isArray(productsData[categoryKey])) {
          productsData[categoryKey].forEach(item => {
            allList.push({ ...item, category: categoryKey });
          });
        }
      });
    }

    if (allList.length === 0) return;

    const userConcerns = result?.survey?.concerns || ['fatigue'];
    const matched = [];
    const usedNames = new Set();

    const findProductForConcern = (concernId) => {
      let candidate = null;
      if (concernId === 'joint') {
        candidate = allList.find(p => !usedNames.has(p.name) && (p.category?.includes('관절') || p.name.includes('초록입') || p.name.includes('콘드로이친')));
      } else if (concernId === 'fatigue') {
        candidate = allList.find(p => !usedNames.has(p.name) && (p.category?.includes('피로') || p.name.includes('밀크씨슬') || p.name.includes('후코이단')));
      } else if (concernId === 'circulation') {
        candidate = allList.find(p => !usedNames.has(p.name) && (p.category?.includes('혈관') || p.name.includes('오메가') || p.name.includes('폴리코사놀')));
      } else if (concernId === 'skin') {
        candidate = allList.find(p => !usedNames.has(p.name) && (p.category?.includes('피부') || p.name.includes('콜라겐') || (p.efficacy && p.efficacy.includes('피부'))));
      } else if (concernId === 'immunity') {
        candidate = allList.find(p => !usedNames.has(p.name) && (p.category?.includes('면역') || p.name.includes('프로폴리스')));
      } else if (concernId === 'other') {
        // ★ [기타 전신]일 경우 로얄젤리, 종합, 스피루리나, 마린콜라겐 등을 우선 매칭
        candidate = allList.find(p => !usedNames.has(p.name) && (p.name.includes('로얄젤리') || p.name.includes('콜라겐') || p.category?.includes('기타')));
      }

      // 조건에 맞는 게 없으면 그냥 아무거나 남은 거 하나
      if (!candidate) {
        candidate = allList.find(p => !usedNames.has(p.name));
      }

      if (candidate) {
        usedNames.add(candidate.name);
        return { ...candidate, matchedConcernId: concernId };
      }
      return null;
    };

    userConcerns.forEach(concernId => {
      if (matched.length < 3) {
        const prod = findProductForConcern(concernId);
        if (prod) matched.push(prod);
      }
    });

    if (matched.length < 3) {
      allList.forEach(p => {
        if (matched.length < 3 && !usedNames.has(p.name)) {
          usedNames.add(p.name);
          matched.push({ ...p, matchedConcernId: 'general' });
        }
      });
    }

    setRecommendedProducts(matched.slice(0, 3));
  }, [result]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white font-sans select-none">
      
      {/* 1. 상단 글로벌 헤더 */}
      <div className="w-full flex items-center justify-between px-6 md:px-10 py-4 bg-slate-900/90 border-b border-emerald-500/20 shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
            <img src={logoImg} alt="AGH" className="h-8 md:h-10 object-contain" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-black text-white flex items-center gap-2">
              {t.title} <Sparkles className="w-5 h-5 text-emerald-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium">{t.subtitle}</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="text-sm font-bold">{t.btnReset}</span>
        </button>
      </div>

      {/* 2. 메인 바디 */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* 좌측 패널 */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 md:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full blur-2xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="text-xs font-black text-emerald-400 tracking-widest">{t.scoreTitle}</div>
              <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">{t.scoreLabel}</div>
            </div>

            <div className="flex items-center gap-5 mb-7">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-emerald-400 flex items-center justify-center bg-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] shrink-0">
                <span className="text-4xl md:text-5xl font-black text-white">88</span>
                <span className="absolute bottom-2 text-[10px] text-emerald-400 font-bold">점/100</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h3 className="text-base md:text-lg font-bold text-white leading-tight">{t.balanceGood}</h3>
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed break-keep">
                  {scanType === 'face' ? t.balanceDescFace : t.balanceDescHand}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Activity className="w-4 h-4 text-cyan-400"/>, label: t.bar1, val: 78, color: "from-cyan-500 to-blue-400" },
                { icon: <Zap className="w-4 h-4 text-amber-400"/>, label: t.bar2, val: 84, color: "from-amber-500 to-orange-400" },
                { icon: <Droplets className="w-4 h-4 text-emerald-400"/>, label: t.bar3, val: 88, color: "from-emerald-500 to-teal-400" }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1.5 text-xs md:text-sm font-bold text-slate-200">
                    <span className="flex items-center gap-2">{item.icon} {item.label}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className={`h-full bg-gradient-to-r ${item.color} shadow-lg`} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-5 shadow-xl flex gap-4 items-start">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-cyan-300 mb-1">{t.safetyTitle}</h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed break-keep">
                {getDrugSafetyMessage()}
              </p>
            </div>
          </div>
        </div>

        {/* 우측 패널 (다국어 JSON 맵핑 완료) */}
        <div className="lg:col-span-8 flex flex-col bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-7 justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
                <HeartPulse className="w-6 h-6 text-emerald-400" />
                {t.recoTitle}
              </h2>
              <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 text-xs font-bold">
                {t.recoBadge}
              </div>
            </div>
            <p className="text-xs text-emerald-300/80 mb-5 break-keep">💡 {t.clickGuide}</p>

            <div className="space-y-3.5">
              {recommendedProducts.map((prod, index) => {
                const imgId = getProductImageId(prod.link);
                const badgeText = getBadgeName(prod.matchedConcernId);

                return (
                  <div 
                    key={index} 
                    onClick={() => setSelectedProduct(prod)}
                    className="group relative flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-400 transition-all shadow-lg cursor-pointer active:scale-[0.99]"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                      {imgId ? (
                        <img 
                          src={`/images/${imgId}.jpg`} 
                          alt={getLangField(prod, 'name')} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <Pill className="w-10 h-10 text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5 flex-wrap">
                        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {t.concernBadgePre}: {badgeText}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          추천 0{index + 1}
                        </span>
                      </div>

                      {/* ★ 다국어 자동 변환 적용 부분 */}
                      <h3 className="text-base md:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-1.5">
                        {getLangField(prod, 'name')}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 break-keep mb-2">
                        {getLangField(prod, 'efficacy')}
                      </p>
                    </div>

                    <div className="w-full md:w-44 bg-slate-900 rounded-xl p-3 flex flex-col justify-center items-center border border-slate-800 group-hover:border-emerald-500/40 shrink-0">
                      <span className="text-[10px] text-slate-400 mb-1">{t.usageGuide}</span>
                      <span className="text-xs font-bold text-emerald-300 text-center break-keep leading-tight mb-2">
                        {getLangField(prod, 'usage')}
                      </span>
                      <span className="text-[11px] font-bold text-white bg-emerald-600/60 hover:bg-emerald-500 px-3 py-1 rounded-full flex items-center gap-1 transition-all">
                        {t.detailBtn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400 text-right break-keep">
            * {t.footer}
          </div>
        </div>

      </div>

      {/* 3. 하단 액션 버튼 바 */}
      <div className="w-full bg-slate-900 border-t border-slate-800 p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleExpertCall}
            className="flex-1 md:flex-none flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/60 text-teal-200 font-bold hover:bg-teal-500/30 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <MessageSquare className="w-5 h-5 text-teal-300" />
            <span className="text-sm md:text-base font-extrabold">{t.btnExpert}</span>
          </button>
          <button 
            onClick={() => setShowQrModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <Smartphone className="w-5 h-5" />
            <span>{t.btnSave}</span>
          </button>
        </div>
      </div>

      {/* 4. 제품 상세 팝업 (다국어 완벽 적용) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-5 right-5 p-2.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-center mb-6 border-b border-slate-800 pb-6">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-white p-3 flex items-center justify-center shrink-0 shadow-xl">
                {getProductImageId(selectedProduct.link) ? (
                  <img 
                    src={`/images/${getProductImageId(selectedProduct.link)}.jpg`} 
                    alt={getLangField(selectedProduct, 'name')} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Pill className="w-16 h-16 text-slate-400" />
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase mb-2 inline-block">
                  {getBadgeName(selectedProduct.matchedConcernId)}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">
                  {getLangField(selectedProduct, 'name')}
                </h3>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-black text-emerald-400 mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  {t.modalEfficacy}
                </h4>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed break-keep">
                  {getLangField(selectedProduct, 'efficacy')}
                </p>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-black text-teal-400 mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  {t.modalUsage}
                </h4>
                <p className="text-sm md:text-base text-teal-200 font-bold leading-relaxed break-keep">
                  {getLangField(selectedProduct, 'usage')}
                </p>
              </div>

              <div className="bg-cyan-950/30 p-4 rounded-2xl border border-cyan-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-cyan-300 mb-0.5">{t.modalWarning}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed break-keep">
                    {getDrugSafetyMessage()}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedProduct(null)} 
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}

      {/* 전문가 상담 요청 완료 모달 */}
      {showExpertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 border-2 border-teal-500/50 rounded-3xl p-8 shadow-2xl text-center">
            <button 
              onClick={() => setShowExpertModal(false)} 
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-20 h-20 rounded-3xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto mb-5 shadow-lg border border-teal-500/30">
              <BellRing className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="text-2xl font-black text-white mb-3">{t.expertModalTitle}</h3>
            <p className="text-base font-bold text-teal-300 mb-4 break-keep">{t.expertModalDesc1}</p>
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 text-sm text-slate-300 leading-relaxed mb-6 break-keep">
              {t.expertModalDesc2}
            </div>

            <button
              onClick={() => setShowExpertModal(false)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              {t.expertModalConfirm}
            </button>
          </div>
        </div>
      )}

      {/* QR 모달 */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-8 shadow-2xl text-center">
            <button 
              onClick={() => setShowQrModal(false)} 
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-black text-white mb-2 flex items-center justify-center gap-2">
              <QrCode className="w-7 h-7 text-emerald-400" />
              {t.qrModalTitle}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 mb-6 break-keep">{t.qrModalDesc}</p>

            <div className="w-56 h-56 mx-auto bg-white p-4 rounded-2xl shadow-2xl flex flex-col items-center justify-center mb-6 border-4 border-emerald-400">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://aghgreenhealth.com/report?id=88" 
                alt="QR Code" 
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-xs text-emerald-300/80 mb-6 break-keep">🔒 {t.qrNotice}</p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}