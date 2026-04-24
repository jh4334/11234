export const consentItems = [
  {
    id: 1,
    app: "날씨 앱",
    emoji: "🌤️",
    request: "현재 위치 정보를 수집합니다",
    purpose: "정확한 날씨 정보 제공",
    shouldAccept: true,
    reason: "날씨를 알려면 위치가 필요해요. 합리적인 요청이에요."
  },
  {
    id: 2,
    app: "손전등 앱",
    emoji: "🔦",
    request: "연락처 목록을 수집합니다",
    purpose: "더 나은 서비스 제공",
    shouldAccept: false,
    reason: "손전등에 연락처가 왜 필요할까요? 불필요한 정보 수집이에요."
  },
  {
    id: 3,
    app: "학교 알림장 앱",
    emoji: "📚",
    request: "학년, 반 정보를 수집합니다",
    purpose: "맞춤 알림 전송",
    shouldAccept: true,
    reason: "학교 정보가 있어야 알림장을 제대로 받을 수 있어요."
  },
  {
    id: 4,
    app: "게임 앱",
    emoji: "🎮",
    request: "사진첩의 모든 사진을 수집합니다",
    purpose: "게임 경험 향상",
    shouldAccept: false,
    reason: "게임에 모든 사진이 필요하진 않아요. 개인 사진이 유출될 수 있어요."
  },
  {
    id: 5,
    app: "지도 앱",
    emoji: "🗺️",
    request: "위치 기록을 저장합니다",
    purpose: "경로 안내 및 즐겨찾기 기능",
    shouldAccept: true,
    reason: "지도 앱은 길 안내를 위해 위치 정보가 꼭 필요해요."
  },
  {
    id: 6,
    app: "계산기 앱",
    emoji: "🔢",
    request: "마이크 접근 권한을 요청합니다",
    purpose: "음성 입력 기능",
    shouldAccept: false,
    reason: "기본 계산기에 마이크는 불필요해요. 도청 위험이 있어요."
  },
  {
    id: 7,
    app: "건강 관리 앱",
    emoji: "❤️",
    request: "걸음 수와 수면 시간을 수집합니다",
    purpose: "건강 분석 및 조언 제공",
    shouldAccept: true,
    reason: "건강 관리를 위해 필요한 정보예요. 앱 목적에 맞아요."
  },
  {
    id: 8,
    app: "퀴즈 앱",
    emoji: "❓",
    request: "친구 목록과 통화 기록을 수집합니다",
    purpose: "소셜 기능 제공",
    shouldAccept: false,
    reason: "퀴즈에 통화 기록은 필요 없어요. 과도한 정보 요청이에요."
  }
];
