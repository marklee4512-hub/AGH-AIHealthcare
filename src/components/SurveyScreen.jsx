import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Globe, UserCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

const translations = {
  ko: {
    backBtn: "이전으로",
    basicTitle: "기본 정보",
    basicSub: "성별과 연령대를 선택해 주세요",
    genderMale: "남성",
    genderFemale: "여성",
    age2030: "20~30대",
    age4050: "40~50대",
    age60plus: "60대 이상",
    q1Title: "현재 가장 개선하고 싶은 건강 고민은 무엇인가요?",
    q1Sub: "해당하는 항목을 모두 터치해 주세요 (중복 선택 가능)",
    q2Title: "현재 정기적으로 복용 중인 의약품이 있으신가요?",
    q2Sub: "성분 충돌을 사전에 차단하기 위한 AGH 안심 교차 검증 질문입니다.",
    btnFace: "얼굴 정밀 스캔 시작",
    btnHand: "손 혈색 스캔 시작",
    footer: "입력하신 건강 문진 데이터는 분석 직후 완전히 파기됩니다.",
    c1: "만성 피로 & 활력 저하",
    c2: "피부 건조 & 안색 칙칙함",
    c3: "손발 저림 & 혈행 순환",
    c4: "관절 마디 & 뼈 건강",
    c5: "면역력 저하 & 잦은 감기",
    c6: "기타 전신 컨디션 관리",
    d1: "복용 중인 약물 없음 (건강식품만 섭취)",
    d2: "혈압약 / 당뇨약 복용 중",
    d3: "아스피린 / 항응고제 복용 중",
    d4: "기타 정기 처방 의약품 복용 중"
  },
  en: {
    backBtn: "Back",
    basicTitle: "Basic Profile",
    basicSub: "Select gender and age group",
    genderMale: "Male",
    genderFemale: "Female",
    age2030: "20s–30s",
    age4050: "40s–50s",
    age60plus: "60s+",
    q1Title: "What is your primary health concern right now?",
    q1Sub: "Please touch all that apply (Multiple choices allowed)",
    q2Title: "Are you regularly taking any prescription drugs?",
    q2Sub: "AGH safety check to prevent any nutritional ingredient conflicts.",
    btnFace: "Start Face Precision Scan",
    btnHand: "Start Hand Circulation Scan",
    footer: "Your survey inputs are completely destroyed immediately after analysis.",
    c1: "Chronic Fatigue & Low Energy",
    c2: "Dry Skin & Dull Complexion",
    c3: "Numbness & Blood Circulation",
    c4: "Joint & Bone Health",
    c5: "Low Immunity & Frequent Colds",
    c6: "General Health & Vitality",
    d1: "No prescription drugs (Supplements only)",
    d2: "Blood Pressure / Diabetes meds",
    d3: "Aspirin / Blood Thinners",
    d4: "Other regular prescription drugs"
  },
  zh: {
    backBtn: "返回",
    basicTitle: "基本信息",
    basicSub: "请选择性别与年龄段",
    genderMale: "男士",
    genderFemale: "女士",
    age2030: "20~30岁",
    age4050: "40~50岁",
    age60plus: "60岁以上",
    q1Title: "您目前最希望改善的健康问题是什么？",
    q1Sub: "请点击所有符合的项目（可多选）",
    q2Title: "您目前是否有定期服用的处方药物？",
    q2Sub: "AGH安全排查，防止营养成分与药物发生成分冲突。",
    btnFace: "开始面部精密扫描",
    btnHand: "开始手部血色扫描",
    footer: "您填写的健康问卷数据在分析完成后将立即彻底销毁。",
    c1: "慢性疲劳与精力不足",
    c2: "肌肤干燥与气色暗沉",
    c3: "手脚麻木与血液循环",
    c4: "关节酸痛与骨骼健康",
    c5: "免疫力低下与易感冒",
    c6: "其他全身健康综合管理",
    d1: "未服用处方药（仅服用保健品）",
    d2: "正在服用降压药/降糖药",
    d3: "正在服用阿司匹林/抗凝血药",
    d4: "正在服用其他定期处方药物"
  },
  ja: {
    backBtn: "戻る",
    basicTitle: "基本情報",
    basicSub: "性別と年代を選択してください",
    genderMale: "男性",
    genderFemale: "女性",
    age2030: "20〜30代",
    age4050: "40〜50代",
    age60plus: "60代以上",
    q1Title: "現在、最も改善したい健康のお悩みは何ですか？",
    q1Sub: "該当する項目をすべてタッチしてください（複数選択可）",
    q2Title: "現在、定期的に服用しているお薬はありますか？",
    q2Sub: "成分の衝突を未然に防ぐためのAGH安全相互確認です。",
    btnFace: "顔精密スキャンを開始",
    btnHand: "手の血色スキャンを開始",
    footer: "ご入力いただいた健康問診データは分析直後に完全に破棄されます。",
    c1: "慢性疲労＆活力低下",
    c2: "肌の乾燥＆くすみ",
    c3: "手足の冷え＆血行循環",
    c4: "関節・節々の違和感＆骨の健康",
    c5: "免疫力低下＆風邪気味",
    c6: "その他全身のコンディション管理",
    d1: "服用中のお薬なし（健康サプリのみ）",
    d2: "血圧薬／糖尿病薬を服用中",
    d3: "アスピリン／抗凝固薬を服用中",
    d4: "その他処方薬を定期服用中"
  }
};

export default function SurveyScreen({ scanType, onComplete, onBack, language = 'ko', setLanguage }) {
  const [gender, setGender] = useState('female');
  const [ageGroup, setAgeGroup] = useState('4050');
  const [selectedConcerns, setSelectedConcerns] = useState(['fatigue']);
  const [selectedDrug, setSelectedDrug] = useState('none');

  const t = translations[language] || translations.ko;

  // 6대 고민 리스트 (3x2 완벽 대칭)
  const concernsList = [
    { id: 'fatigue', label: t.c1, icon: '⚡' },
    { id: 'skin', label: t.c2, icon: '✨' },
    { id: 'circulation', label: t.c3, icon: '🩸' },
    { id: 'joint', label: t.c4, icon: '🦴' },
    { id: 'immunity', label: t.c5, icon: '🛡️' },
    { id: 'other', label: t.c6, icon: '🌿' }
  ];

  const drugOptions = [
    { id: 'none', label: t.d1 },
    { id: 'bp_sugar', label: t.d2 },
    { id: 'blood_thinner', label: t.d3 },
    { id: 'other', label: t.d4 }
  ];

  const toggleConcern = (id) => {
    if (selectedConcerns.includes(id)) {
      if (selectedConcerns.length > 1) setSelectedConcerns(selectedConcerns.filter(item => item !== id));
    } else {
      setSelectedConcerns([...selectedConcerns, id]);
    }
  };

  const handleNext = () => {
    onComplete({
      gender,
      ageGroup,
      concerns: selectedConcerns,
      drugInfo: selectedDrug
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white p-6 md:p-8 select-none">
      
      {/* 1. 상단 바 */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-3 items-center border-b border-emerald-500/20 pb-4">
        <div className="flex justify-start">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-base whitespace-nowrap">{t.backBtn}</span>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="p-2.5 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md shadow-md">
            <img src={logoImg} alt="AGH 그린건강" className="h-12 md:h-14 object-contain rounded drop-shadow" />
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          {setLanguage && (
            <div className="flex items-center bg-slate-900/80 border border-slate-700 rounded-full p-1 shadow-md">
              <Globe className="w-4 h-4 text-slate-400 ml-1.5 mr-1" />
              <div className="flex gap-0.5">
                {['ko', 'en', 'zh', 'ja'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === lang ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                    {lang === 'ko' ? 'KO' : lang === 'en' ? 'EN' : lang === 'zh' ? '中' : '日'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. 중앙 설문 컨테이너 */}
      <div className="w-full max-w-4xl mx-auto my-auto space-y-3.5 py-1">
        
        {/* 기본 정보: 성별 & 연령대 */}
        <div className="bg-slate-900/85 border border-emerald-500/25 rounded-2xl p-3.5 md:p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-black text-white">{t.basicTitle}</h4>
              <p className="text-[11px] md:text-xs text-slate-300">{t.basicSub}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${gender === 'female' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                {t.genderFemale}
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${gender === 'male' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                {t.genderMale}
              </button>
            </div>

            <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setAgeGroup('2030')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${ageGroup === '2030' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                {t.age2030}
              </button>
              <button
                type="button"
                onClick={() => setAgeGroup('4050')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${ageGroup === '4050' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                {t.age4050}
              </button>
              <button
                type="button"
                onClick={() => setAgeGroup('60plus')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${ageGroup === '60plus' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                {t.age60plus}
              </button>
            </div>
          </div>
        </div>

        {/* 질문 1: 6대 건강 고민 (3열 그리드로 시원하게 배치) */}
        <div className="bg-slate-900/85 border border-emerald-500/25 rounded-3xl p-4 md:p-5 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-base md:text-lg font-black text-white break-keep">{t.q1Title}</h3>
              <p className="text-[11px] md:text-xs text-slate-300 break-keep">{t.q1Sub}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {concernsList.map(item => {
              const isSelected = selectedConcerns.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleConcern(item.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between min-h-[64px] ${
                    isSelected 
                      ? 'border-emerald-400 bg-emerald-950/50 shadow-md shadow-emerald-950/40' 
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-bold text-xs md:text-sm text-white break-keep leading-tight text-left">{item.label}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2 ${isSelected ? 'bg-emerald-400 text-slate-950' : 'border border-slate-700'}`}>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 질문 2: 약물 복용 체크 */}
        <div className="bg-slate-900/85 border border-cyan-500/25 rounded-3xl p-4 md:p-5 shadow-xl">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-base md:text-lg font-black text-white break-keep">{t.q2Title}</h3>
              <p className="text-[11px] md:text-xs text-cyan-300/90 break-keep">{t.q2Sub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {drugOptions.map(option => {
              const isSelected = selectedDrug === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedDrug(option.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'border-cyan-400 bg-cyan-950/50 shadow-md shadow-cyan-950/30' 
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-xs md:text-sm text-slate-200 break-keep">{option.label}</span>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2 ${isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'}`}>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. 하단 버튼 */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between pt-1">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="break-keep">{t.footer}</span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>{scanType === 'face' ? t.btnFace : t.btnHand}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}