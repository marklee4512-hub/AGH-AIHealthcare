// src/utils/scoreCalculator.js
import productsData from '../data/products.json';

export function calculateHealthScoreAndProducts(surveyData, scanType = 'face', language = 'ko') {
  const concerns = surveyData?.concerns || [];
  const ageGroup = surveyData?.age || '40-50대';
  const medications = surveyData?.medications || [];

  // 1. 전체 점수 산출
  let baseScore = 84;
  if (concerns.length >= 2) baseScore -= 4;
  if (concerns.length >= 4) baseScore -= 4;
  if (ageGroup === '60대 이상') baseScore -= 3;
  if (ageGroup === '20-30대') baseScore += 2;
  if (medications.length > 0 && !medications.includes('none')) baseScore -= 3;

  const randomJitter = Math.floor(Math.random() * 5) - 2;
  const totalScore = Math.min(93, Math.max(68, baseScore + randomJitter));

  // 2. 고민 항목에 따른 세부 그래프 동적 차등화
  let circulationScore = totalScore - 2;
  let metabolismScore = totalScore + 1;
  let vitalityScore = totalScore;

  // 혈행/순환 고민 선택 시 순환 수치 집중 하락 (현실감 부여)
  if (concerns.includes('circulation')) {
    circulationScore = Math.max(62, totalScore - 12);
    vitalityScore = totalScore - 3;
  }
  // 피로 고민 선택 시 활력도 집중 하락
  if (concerns.includes('fatigue')) {
    vitalityScore = Math.max(60, totalScore - 14);
    metabolismScore = totalScore - 4;
  }
  // 관절 또는 피부 고민 시 대사율 조정
  if (concerns.includes('joint') || concerns.includes('skin')) {
    metabolismScore = Math.max(64, totalScore - 10);
  }

  const detailScores = {
    circulation: Math.min(95, circulationScore),
    metabolism: Math.min(95, metabolismScore),
    vitality: Math.min(95, vitalityScore)
  };

  // 3. products.json에서 고민 맞춤 제품 3선 매칭
  let allList = [];
  if (Array.isArray(productsData)) {
    allList = productsData;
  } else if (typeof productsData === 'object') {
    Object.keys(productsData).forEach(k => {
      if (Array.isArray(productsData[k])) {
        productsData[k].forEach(item => allList.push({ ...item, category: k }));
      }
    });
  }

  // 고민별 키워드 매칭 규칙
  const getKeywordFilter = (c) => {
    switch (c) {
      case 'circulation':
        return ['오메가', '혈관', '순환', '징코', '은행잎', '폴리코사놀', '크릴'];
      case 'fatigue':
        return ['밀크씨슬', '피로', '후코이단', '베르베린', '간', '활력'];
      case 'joint':
        return ['초록입', '콘드로이친', '관절', '상어연골', 'MSM', '뼈'];
      case 'skin':
        return ['콜라겐', '피부', '글루타치온', '히알루론', '세럼'];
      case 'immunity':
        return ['프로폴리스', '면역', '유산균', '아연', '비타민'];
      default:
        return ['로얄젤리', '스피루리나', '항산화', '밸런스'];
    }
  };

  const primaryConcern = concerns[0] || 'fatigue';
  const targetKeywords = getKeywordFilter(primaryConcern);

  // 1차: 선택한 주요 고민 키워드가 제품명/효능/카테고리에 들어있는 제품 모두 추출
  let matched = allList.filter(p => {
    const text = `${p.name || ''} ${p.category || ''} ${p.efficacy || ''} ${p.desc || ''}`;
    return targetKeywords.some(kw => text.includes(kw));
  });

  // 2차: 만약 3개가 안 채워졌고 두 번째 고민이 있다면 두 번째 고민 제품 추가
  if (matched.length < 3 && concerns[1]) {
    const secondaryKeywords = getKeywordFilter(concerns[1]);
    const secondary = allList.filter(p => {
      if (matched.some(m => m.name === p.name)) return false;
      const text = `${p.name || ''} ${p.category || ''} ${p.efficacy || ''} ${p.desc || ''}`;
      return secondaryKeywords.some(kw => text.includes(kw));
    });
    matched = [...matched, ...secondary];
  }

  // 3차: 그래도 모자라면 전체 인기 제품 중 중복 제외하고 보충
  if (matched.length < 3) {
    const fallback = allList.filter(p => !matched.some(m => m.name === p.name));
    matched = [...matched, ...fallback];
  }

  const finalProducts = matched.slice(0, 3).map((prod, idx) => ({
    ...prod,
    matchedConcernId: primaryConcern,
    rank: idx === 0 ? "추천 01 (집중 처방)" : idx === 1 ? "추천 02 (시너지 케어)" : "추천 03 (기초 밸런스)"
  }));

  return {
    totalScore,
    detailScores,
    recommendedProducts: finalProducts
  };
}