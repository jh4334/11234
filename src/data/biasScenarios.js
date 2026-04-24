export const biasScenarios = [
  {
    id: 1,
    situation: "AI 채용 시스템이 이력서를 검토합니다",
    emoji: "💼",
    decisions: [
      { text: "경력과 기술 능력으로 평가", isBiased: false },
      { text: "지원자의 이름으로 성별을 추측해서 분류", isBiased: true },
      { text: "관련 자격증 보유 여부 확인", isBiased: false }
    ],
    explanation: "이름으로 성별을 추측하는 것은 차별입니다. 능력과 무관한 기준이에요."
  },
  {
    id: 2,
    situation: "AI 대출 심사 시스템이 신청서를 분석합니다",
    emoji: "🏦",
    decisions: [
      { text: "신용점수와 소득으로 판단", isBiased: false },
      { text: "거주 지역의 평균 소득으로 판단", isBiased: true },
      { text: "과거 대출 상환 기록 확인", isBiased: false }
    ],
    explanation: "거주 지역으로 판단하면 특정 지역 주민이 불이익을 받아요. 개인의 상황을 봐야 해요."
  },
  {
    id: 3,
    situation: "AI 의료 진단 시스템이 환자를 분석합니다",
    emoji: "🏥",
    decisions: [
      { text: "증상과 검사 결과로 진단", isBiased: false },
      { text: "나이가 많으면 치료 우선순위를 낮춤", isBiased: true },
      { text: "환자의 병력 기록 참고", isBiased: false }
    ],
    explanation: "나이만으로 치료 우선순위를 정하면 나이 차별이에요. 모든 환자는 동등해요."
  },
  {
    id: 4,
    situation: "AI 광고 시스템이 누구에게 광고를 보여줄지 결정합니다",
    emoji: "📱",
    decisions: [
      { text: "사용자의 관심사 기반으로 추천", isBiased: false },
      { text: "고소득 지역에만 고급 제품 광고 표시", isBiased: true },
      { text: "검색 기록 분석으로 추천", isBiased: false }
    ],
    explanation: "소득 수준으로 광고를 제한하면 기회의 불평등이 생겨요."
  },
  {
    id: 5,
    situation: "AI 번역 시스템이 문장을 번역합니다",
    emoji: "🌐",
    decisions: [
      { text: "문맥을 분석해서 정확히 번역", isBiased: false },
      { text: "'의사'를 항상 '남자 의사'로 번역", isBiased: true },
      { text: "여러 번역 옵션을 제시", isBiased: false }
    ],
    explanation: "직업에 성별을 붙이는 것은 고정관념을 강화해요. 중립적으로 번역해야 해요."
  },
  {
    id: 6,
    situation: "AI 추천 시스템이 학생에게 진로를 추천합니다",
    emoji: "🎓",
    decisions: [
      { text: "학생의 적성과 흥미로 추천", isBiased: false },
      { text: "부모님 직업을 기준으로 추천", isBiased: true },
      { text: "학업 성취도와 활동 기록 분석", isBiased: false }
    ],
    explanation: "부모님 직업으로 진로를 정하면 학생 본인의 가능성을 무시하는 거예요."
  }
];
