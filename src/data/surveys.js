// 사전/사후 설문 문항 (5점 리커트 척도)
// 역량별로 매핑: Privacy, Fairness, Transparency, Responsibility

export const preSurveyQuestions = [
  {
    id: "pre1",
    text: "나는 AI가 내 개인 정보를 어떻게 사용하는지 관심이 있다.",
    category: "Privacy",
  },
  {
    id: "pre2",
    text: "나는 AI가 모든 사람을 공평하게 대해야 한다고 생각한다.",
    category: "Fairness",
  },
  {
    id: "pre3",
    text: "나는 AI를 사용할 때 그 결과에 대해 책임을 져야 한다고 생각한다.",
    category: "Responsibility",
  },
];

export const postSurveyQuestions = [
  {
    id: "post1",
    text: "이 활동 후, AI를 사용할 때 개인 정보 보호가 더 중요하게 느껴진다.",
    category: "Privacy",
  },
  {
    id: "post2",
    text: "이 활동 후, AI의 공정성 문제에 더 관심을 갖게 되었다.",
    category: "Fairness",
  },
  {
    id: "post3",
    text: "이 활동 후, AI 사용 결과에 대한 나의 책임감이 커졌다.",
    category: "Responsibility",
  },
];

export const surveyOptions = [
  { value: 1, label: "전혀 아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];
