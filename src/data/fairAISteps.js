export const fairAISteps = [
  {
    id: 1,
    phase: "데이터 수집",
    emoji: "📊",
    situation: "AI 추천 시스템을 만들기 위해 데이터를 모으고 있어요",
    question: "어떤 방식으로 데이터를 모을까요?",
    choices: [
      {
        text: "다양한 연령, 성별, 지역의 사람들에게 고르게 수집",
        score: 3,
        feedback: "훌륭해요! 다양한 데이터가 공정한 AI를 만들어요",
        impact: "diversity"
      },
      {
        text: "접근하기 쉬운 대학생들에게만 수집",
        score: 1,
        feedback: "특정 집단만의 데이터는 편향을 만들어요",
        impact: "bias"
      },
      {
        text: "온라인에서 빠르게 크롤링",
        score: 0,
        feedback: "출처 불명의 데이터는 품질과 윤리 문제가 있어요",
        impact: "quality"
      }
    ]
  },
  {
    id: 2,
    phase: "데이터 검토",
    emoji: "🔍",
    situation: "수집한 데이터를 확인해보니 특정 패턴이 보여요",
    question: "남성 지원자가 더 많이 합격한 과거 데이터가 있어요. 어떻게 할까요?",
    choices: [
      {
        text: "그대로 사용 - 과거 데이터니까 사실이잖아",
        score: 0,
        feedback: "과거의 편향을 그대로 학습하면 AI도 편향돼요",
        impact: "bias"
      },
      {
        text: "성별 정보를 제거하고, 능력 기반 데이터만 사용",
        score: 3,
        feedback: "좋아요! 불필요한 특성을 제거하면 공정해져요",
        impact: "fairness"
      },
      {
        text: "여성 데이터만 더 많이 추가",
        score: 1,
        feedback: "단순 추가보다는 근본적인 해결이 필요해요",
        impact: "partial"
      }
    ]
  },
  {
    id: 3,
    phase: "모델 학습",
    emoji: "🧠",
    situation: "AI 모델을 훈련시키고 있어요",
    question: "모델이 '좋은 직원'을 예측할 때 어떤 기준을 쓸까요?",
    choices: [
      {
        text: "업무 성과, 협업 능력, 문제 해결력",
        score: 3,
        feedback: "직무 관련 객관적 기준이 가장 공정해요",
        impact: "fairness"
      },
      {
        text: "출신 학교, 사는 지역, 외모",
        score: 0,
        feedback: "업무와 무관한 기준은 차별이에요",
        impact: "discrimination"
      },
      {
        text: "면접관이 좋아하는 유형",
        score: 1,
        feedback: "주관적 기준은 편향을 만들어요",
        impact: "bias"
      }
    ]
  },
  {
    id: 4,
    phase: "테스트",
    emoji: "🧪",
    situation: "만든 AI를 테스트하고 있어요",
    question: "테스트 결과, 특정 지역 출신에게 낮은 점수를 줘요. 어떻게 할까요?",
    choices: [
      {
        text: "지역과 점수의 관계를 분석하고 수정",
        score: 3,
        feedback: "훌륭해요! 문제를 찾고 고치는 게 중요해요",
        impact: "fix"
      },
      {
        text: "통계적으로 맞으니까 그냥 사용",
        score: 0,
        feedback: "통계가 맞아도 차별은 차별이에요",
        impact: "discrimination"
      },
      {
        text: "해당 지역 데이터를 모두 삭제",
        score: 1,
        feedback: "삭제보다는 원인을 파악하는 게 좋아요",
        impact: "avoidance"
      }
    ]
  },
  {
    id: 5,
    phase: "배포",
    emoji: "🚀",
    situation: "AI를 실제로 사용하려고 해요",
    question: "AI 시스템을 어떻게 운영할까요?",
    choices: [
      {
        text: "정기적으로 결과를 모니터링하고 피드백 반영",
        score: 3,
        feedback: "지속적인 관리가 공정성을 유지해요",
        impact: "maintenance"
      },
      {
        text: "한 번 만들었으니 그냥 계속 사용",
        score: 0,
        feedback: "시간이 지나면 새로운 편향이 생길 수 있어요",
        impact: "neglect"
      },
      {
        text: "문제가 생기면 그때 고치기",
        score: 1,
        feedback: "사후 대응보다 예방이 중요해요",
        impact: "reactive"
      }
    ]
  },
  {
    id: 6,
    phase: "투명성",
    emoji: "📢",
    situation: "사용자가 AI 결정에 대해 궁금해해요",
    question: "AI가 왜 이런 결정을 했는지 물어보면?",
    choices: [
      {
        text: "결정 이유를 설명하고 이의 제기 방법 안내",
        score: 3,
        feedback: "완벽해요! 투명성과 책임감이 중요해요",
        impact: "transparency"
      },
      {
        text: "AI가 결정한 거라 우리도 몰라요",
        score: 0,
        feedback: "설명할 수 없는 AI는 신뢰할 수 없어요",
        impact: "blackbox"
      },
      {
        text: "영업 비밀이라 알려줄 수 없어요",
        score: 1,
        feedback: "비밀보다 사용자 권리가 중요해요",
        impact: "secrecy"
      }
    ]
  }
];
