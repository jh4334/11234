export const mazeStory = {
  title: "AI 탐정의 하루",
  intro: "당신은 AI 윤리 탐정! 오늘도 다양한 AI 윤리 문제를 해결해야 해요.",

  nodes: {
    start: {
      id: "start",
      emoji: "🕵️",
      text: "아침에 일어나니 세 가지 사건이 접수되어 있어요. 어떤 사건부터 조사할까요?",
      choices: [
        { text: "🏫 학교 AI 채점 시스템 오류", next: "school1" },
        { text: "🏥 병원 AI 진단 논란", next: "hospital1" },
        { text: "🎮 게임 AI 차별 의혹", next: "game1" }
      ]
    },

    // 학교 루트
    school1: {
      id: "school1",
      emoji: "🏫",
      text: "학교에 도착했어요. AI 채점 시스템이 특정 학생들에게 낮은 점수를 줬다고 해요. 어떻게 조사할까요?",
      choices: [
        { text: "채점 데이터를 직접 분석한다", next: "school2a", score: 2 },
        { text: "피해 학생들을 먼저 인터뷰한다", next: "school2b", score: 1 },
        { text: "AI 개발자에게 바로 항의한다", next: "school2c", score: 0 }
      ]
    },
    school2a: {
      id: "school2a",
      emoji: "📊",
      text: "데이터를 분석해보니 손글씨 인식 AI가 왼손잡이 학생의 글씨를 잘 인식하지 못했어요!",
      choices: [
        { text: "왼손잡이 데이터로 AI를 재학습시키자고 제안", next: "school_good", score: 3 },
        { text: "왼손잡이 학생만 수기 채점하자고 제안", next: "school_ok", score: 1 }
      ]
    },
    school2b: {
      id: "school2b",
      emoji: "👥",
      text: "학생들 이야기를 들어보니 왼손잡이 학생들이 주로 피해를 봤어요.",
      choices: [
        { text: "이 정보를 바탕으로 데이터 분석 요청", next: "school2a", score: 2 },
        { text: "학생 증언만으로 AI 사용 중단 요구", next: "school_ok", score: 1 }
      ]
    },
    school2c: {
      id: "school2c",
      emoji: "😤",
      text: "개발자가 방어적으로 나오며 협조하지 않아요. 증거 없이 항의하면 해결이 어려워요.",
      choices: [
        { text: "사과하고 데이터 분석부터 다시 시작", next: "school2a", score: 1 },
        { text: "상급 기관에 민원 제기", next: "school_bad", score: 0 }
      ]
    },
    school_good: {
      id: "school_good",
      emoji: "🎉",
      text: "훌륭해요! AI가 다양한 손글씨를 인식하도록 개선되었고, 모든 학생이 공정하게 평가받게 되었어요!",
      isEnd: true,
      score: 5,
      badge: "공정성 수호자"
    },
    school_ok: {
      id: "school_ok",
      emoji: "😊",
      text: "임시 해결책이에요. 근본적인 AI 개선까지는 아니지만 당장의 피해는 막았어요.",
      isEnd: true,
      score: 2,
      badge: "문제 해결사"
    },
    school_bad: {
      id: "school_bad",
      emoji: "😓",
      text: "시간만 오래 걸리고 해결이 늦어졌어요. 조사를 먼저 했으면 더 빨랐을 거예요.",
      isEnd: true,
      score: 0,
      badge: "다음엔 더 잘할 수 있어요"
    },

    // 병원 루트
    hospital1: {
      id: "hospital1",
      emoji: "🏥",
      text: "병원에 도착했어요. AI 진단 시스템이 특정 인종의 피부암을 잘 감지하지 못한다는 의혹이 있어요.",
      choices: [
        { text: "AI 학습 데이터의 다양성을 확인한다", next: "hospital2a", score: 2 },
        { text: "진단 정확도 통계를 인종별로 비교한다", next: "hospital2b", score: 2 },
        { text: "AI 사용을 당장 중단시킨다", next: "hospital2c", score: 0 }
      ]
    },
    hospital2a: {
      id: "hospital2a",
      emoji: "📁",
      text: "학습 데이터를 확인해보니 대부분 밝은 피부색 사진이었어요. 다양성이 부족했네요!",
      choices: [
        { text: "다양한 피부색 데이터를 추가해서 재학습 제안", next: "hospital_good", score: 3 },
        { text: "현재 AI는 밝은 피부에만 사용하도록 제한", next: "hospital_ok", score: 1 }
      ]
    },
    hospital2b: {
      id: "hospital2b",
      emoji: "📈",
      text: "통계를 보니 어두운 피부색에서 정확도가 20% 낮았어요. 심각한 문제네요!",
      choices: [
        { text: "원인 파악을 위해 학습 데이터 검토", next: "hospital2a", score: 2 },
        { text: "이 통계를 공개하고 개선을 촉구", next: "hospital_good", score: 2 }
      ]
    },
    hospital2c: {
      id: "hospital2c",
      emoji: "🚫",
      text: "AI를 중단하니 진단 속도가 크게 느려져 다른 환자들도 피해를 봤어요.",
      choices: [
        { text: "제한적으로 AI를 다시 사용하며 개선 방안 모색", next: "hospital_ok", score: 1 },
        { text: "인력을 더 투입해서 버틴다", next: "hospital_bad", score: 0 }
      ]
    },
    hospital_good: {
      id: "hospital_good",
      emoji: "🎉",
      text: "대단해요! AI가 모든 피부색을 공정하게 진단하도록 개선되었어요. 생명을 살리는 공정한 AI가 되었어요!",
      isEnd: true,
      score: 5,
      badge: "생명 수호자"
    },
    hospital_ok: {
      id: "hospital_ok",
      emoji: "😊",
      text: "당장은 해결했지만, AI의 근본적인 개선이 필요해요. 계속 모니터링해야 해요.",
      isEnd: true,
      score: 2,
      badge: "신중한 조사관"
    },
    hospital_bad: {
      id: "hospital_bad",
      emoji: "😓",
      text: "의료진이 과로하고 진단 품질도 떨어졌어요. 기술과 인간의 협력이 중요했어요.",
      isEnd: true,
      score: 0,
      badge: "경험치 +1"
    },

    // 게임 루트
    game1: {
      id: "game1",
      emoji: "🎮",
      text: "게임 회사에 도착했어요. AI 매칭 시스템이 특정 플레이어를 불리하게 매칭한다는 신고가 들어왔어요.",
      choices: [
        { text: "매칭 알고리즘 로직을 확인한다", next: "game2a", score: 2 },
        { text: "신고한 플레이어들의 패턴을 분석한다", next: "game2b", score: 2 },
        { text: "게임사 해명을 그대로 믿는다", next: "game2c", score: 0 }
      ]
    },
    game2a: {
      id: "game2a",
      emoji: "⚙️",
      text: "알고리즘을 보니 '과금 유도'를 위해 무과금 유저에게 불리한 매칭을 하고 있었어요!",
      choices: [
        { text: "공정한 매칭으로 수정하도록 권고", next: "game_good", score: 3 },
        { text: "이 사실을 언론에 공개", next: "game_ok", score: 2 }
      ]
    },
    game2b: {
      id: "game2b",
      emoji: "👥",
      text: "분석 결과, 무과금 유저들이 연패하는 비율이 비정상적으로 높았어요.",
      choices: [
        { text: "원인 파악을 위해 알고리즘 검토 요청", next: "game2a", score: 2 },
        { text: "통계만으로 문제 제기", next: "game_ok", score: 1 }
      ]
    },
    game2c: {
      id: "game2c",
      emoji: "🤷",
      text: "게임사는 '실력 차이일 뿐'이라고 해명했지만, 플레이어들의 불만은 계속되고 있어요.",
      choices: [
        { text: "독자적으로 데이터 분석 시작", next: "game2b", score: 1 },
        { text: "사건 종결 처리", next: "game_bad", score: 0 }
      ]
    },
    game_good: {
      id: "game_good",
      emoji: "🎉",
      text: "완벽해요! 게임사가 공정한 매칭 시스템으로 개선했고, 모든 플레이어가 즐겁게 게임할 수 있게 되었어요!",
      isEnd: true,
      score: 5,
      badge: "게임 정의 실현"
    },
    game_ok: {
      id: "game_ok",
      emoji: "😊",
      text: "문제가 알려져서 게임사가 압박을 받고 있어요. 변화가 생길 거예요.",
      isEnd: true,
      score: 2,
      badge: "진실 폭로자"
    },
    game_bad: {
      id: "game_bad",
      emoji: "😓",
      text: "문제가 해결되지 않아 플레이어들이 계속 피해를 보고 있어요. 더 조사했어야 해요.",
      isEnd: true,
      score: 0,
      badge: "다음엔 꼼꼼히!"
    }
  }
};
