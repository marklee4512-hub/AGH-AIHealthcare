// src/utils/scoreCalculator.js
import productsData from '../data/products.json';

// 건강 고민 키워드와 products.json 태그/카테고리 매핑 규칙
export function calculateHealthScoreAndProducts(surveyData, scanType = 'face', language = 'ko') {
  // 1. 기본 점수 산출 로직 (고정 88점 탈피)
  let baseScore = 82;
  const concerns = surveyData?.concerns || [];
  const ageGroup = surveyData?.age || '40-50대';
  const medications = surveyData?.medications || [];

  // 고민 개수 및 연령에 따른 편차 계산
  if (concerns.length >= 2) baseScore -= 5;
  if (concerns.length >= 4) baseScore -= 4;
  if (ageGroup === '60대 이상') baseScore -= 4;
  if (ageGroup === '20-30대') baseScore += 3;

  // 복용 중인 약물이 있을 경우 신체 주의도 반영
  if (medications.length > 0 && !medications.includes('none')) {
    baseScore -= 3;
  }

  // 자연스러운 실시간 측정 느낌을 위한 난수 편차 (±2점)
  const randomJitter = Math.floor(Math.random() * 5) - 2;
  const totalScore = Math.min(94, Math.max(68, baseScore + randomJitter));

  // 세부 바이탈 지표 분기 (스캔 타입 반영)
  const detailScores = {
    vitality: Math.min(95, totalScore + (scanType === 'face' ? 2 : -1)),
    circulation: Math.min(95, totalScore + (scanType === 'hand' ? 3 : -2)),
    metabolism: Math.min(95, totalScore - 1)
  };

  // 2. products.json에서 1:1 맞춤 추천 제품 3개 선별
  const allProducts = Array.isArray(productsData) ? productsData : (productsData.products || []);
  
  // 손님의 첫 번째/두 번째 주요 고민에 맞는 제품 필터링
  let recommended = [];

  if (concerns.length > 0) {
    recommended = allProducts.filter(item => {
      // json의 category, tags, targetConcerns에 사용자의 고민 키워드가 매칭되는지 검사
      return concerns.some(c => 
        (item.category && item.category.includes(c)) ||
        (item.target && item.target.includes(c)) ||
        (item.tags && item.tags.some(t => t.includes(c)))
      );
    });
  }

  // 매칭된 제품이 부족할 경우 기본 인기 제품 보충
  if (recommended.length < 3) {
    const fallback = allProducts.filter(p => !recommended.some(r => r.id === p.id));
    recommended = [...recommended, ...fallback];
  }

  // 최종 상위 3개 제품 선정
  const finalProducts = recommended.slice(0, 3).map((prod, idx) => ({
    ...prod,
    rank: idx === 0 ? "최우선 추천" : idx === 1 ? "집중 케어 추천" : "기초 밸런스 추천",
    // 다국어 처리 지원 (json 내 다국어 필드가 있으면 해당 언어 반환, 없으면 기본값)
    displayName: prod.name?.[language] || prod.name || prod.productName,
    displayDesc: prod.desc?.[language] || prod.desc || prod.description,
    displayDosage: prod.dosage?.[language] || prod.dosage || "하루 1회 섭취",
  }));

  return {
    totalScore,
    detailScores,
    recommendedProducts: finalProducts
  };
}