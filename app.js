const screens = [
  { id: "screen-start", label: "시작 화면" },
  { id: "screen-pre", label: "사전 진단" },
  { id: "screen-mission", label: "시나리오 미션" },
  { id: "screen-post", label: "사후 진단" },
  { id: "screen-report", label: "결과 리포트" },
  { id: "screen-dashboard", label: "교사용 대시보드" },
];

const preQuestions = [
  {
    id: "pre-1",
    text: "AI가 만든 글을 그대로 제출해도 괜찮다.",
    reverse: true,
  },
  {
    id: "pre-2",
    text: "개인정보는 꼭 필요한 만큼만 받는 게 좋다.",
    reverse: false,
  },
  {
    id: "pre-3",
    text: "AI가 준 답은 출처 확인 없이 사용해도 된다.",
    reverse: true,
  },
];

const postQuestions = [...preQuestions];

const missions = [
  {
    id: "mission-1",
    topic: "개인정보/동의",
    competency: "Privacy",
    situation:
      "우리 반 설문 앱을 만들려고 해. 로그인 편하게 하려고 생년월일, 주소까지 받으려고 한다.",
    choices: [
      {
        label: "A",
        text: "필요한 정보만(학년/반/이름 또는 별명) 받는다",
        score: 2,
        feedback:
          "개인정보는 목적 달성에 필요한 최소만 수집해야 해요. 나중을 위해 과하게 받으면 위험이 커져요.",
        alternative: "목적과 필요한 항목을 먼저 적고 그 범위 안에서만 받아요.",
      },
      {
        label: "B",
        text: "혹시 몰라서 생년월일도 받는다",
        score: 1,
        feedback:
          "필요 이상의 정보는 위험을 키울 수 있어요. 꼭 써야 하는 정보인지 다시 점검해보세요.",
        alternative: "학년·반·닉네임만 받아도 충분한지 확인해요.",
      },
      {
        label: "C",
        text: "주소까지 받으면 나중에 연락하기 편하다",
        score: 0,
        feedback:
          "주소는 매우 민감한 정보예요. 목적에 비해 과도한 수집은 윤리적으로 부적절합니다.",
        alternative: "필요할 때만 추가 정보를 요청하고 동의를 받으세요.",
      },
    ],
  },
  {
    id: "mission-2",
    topic: "개인정보/동의",
    competency: "Transparency",
    situation: "AI 학습용으로 학생 글을 모으려 한다.",
    choices: [
      {
        label: "A",
        text: "어떤 데이터를 왜 쓰는지 설명하고 동의를 받는다",
        score: 2,
        feedback:
          "사용 목적과 범위를 투명하게 밝히고 동의를 받는 것이 핵심입니다.",
        alternative: "동의는 언제든 철회할 수 있다는 안내도 포함해요.",
      },
      {
        label: "B",
        text: "동의는 나중에 받고 일단 모은다",
        score: 1,
        feedback:
          "사후 동의는 신뢰를 떨어뜨려요. 데이터 수집 전에 설명이 필요합니다.",
        alternative: "수집 전에 간단한 안내문을 먼저 공유하세요.",
      },
      {
        label: "C",
        text: "수업이니까 동의 없이도 괜찮다",
        score: 0,
        feedback:
          "수업이라도 개인 데이터는 동의가 필요해요. 권리를 존중해야 합니다.",
        alternative: "동의 과정을 통해 신뢰를 쌓아보세요.",
      },
    ],
  },
  {
    id: "mission-3",
    topic: "편향/공정성",
    competency: "Fairness",
    situation:
      "추천 알고리즘이 ‘남학생에게만’ 로봇 활동을 더 추천한다.",
    choices: [
      {
        label: "A",
        text: "추천 기준을 점검하고 특정 집단에 불리한지 확인한다",
        score: 2,
        feedback:
          "편향 여부를 점검하고 개선하는 과정이 공정성을 지키는 핵심입니다.",
        alternative: "추천 결과를 모두에게 공개하고 의견을 받으면 좋아요.",
      },
      {
        label: "B",
        text: "원래 남학생이 로봇 좋아하니까 괜찮다",
        score: 0,
        feedback:
          "고정관념은 편향을 강화할 수 있어요. 데이터가 불공정한지 살펴야 합니다.",
        alternative: "추천 기준을 설명하고 누구나 접근할 수 있게 해요.",
      },
      {
        label: "C",
        text: "추천은 그냥 참고니까 신경 안 쓴다",
        score: 1,
        feedback:
          "추천도 영향을 줍니다. 결과를 점검하고 개선하려는 태도가 필요해요.",
        alternative: "불편한 학생이 있는지 간단히 조사해보세요.",
      },
    ],
  },
  {
    id: "mission-4",
    topic: "저작권/출처",
    competency: "Responsibility",
    situation: "AI가 만든 그림을 발표자료에 넣으려 한다.",
    choices: [
      {
        label: "A",
        text: "“AI 생성 이미지”임을 밝히고 사용 조건을 확인한다",
        score: 2,
        feedback:
          "출처 표시와 이용 조건 확인은 책임 있는 사용의 기본이에요.",
        alternative: "이미지에 출처 라벨을 넣어 투명하게 공개하세요.",
      },
      {
        label: "B",
        text: "그냥 넣는다(내가 만들었다고 말하진 않음)",
        score: 1,
        feedback:
          "표시는 하지 않아도 되지만, 투명성 측면에서 설명이 필요합니다.",
        alternative: "발표 자료에 간단한 출처 표기를 추가해요.",
      },
      {
        label: "C",
        text: "내가 만든 것처럼 말한다",
        score: 0,
        feedback:
          "허위 출처 표기는 책임과 신뢰를 모두 떨어뜨려요.",
        alternative: "AI 도구를 썼다면 솔직하게 밝혀야 합니다.",
      },
    ],
  },
  {
    id: "mission-5",
    topic: "허위정보/검증",
    competency: "Transparency",
    situation: "AI가 ‘사실’처럼 답한 내용을 보고서에 넣으려 한다.",
    choices: [
      {
        label: "A",
        text: "2개 이상 출처로 사실 확인 후 넣는다",
        score: 2,
        feedback:
          "교차 검증은 허위정보를 줄이는 가장 효과적인 방법입니다.",
        alternative: "출처 링크를 함께 첨부하면 신뢰가 높아져요.",
      },
      {
        label: "B",
        text: "AI가 그럴듯하니 넣는다",
        score: 0,
        feedback:
          "그럴듯함은 사실과 다를 수 있어요. 반드시 확인이 필요합니다.",
        alternative: "최소 두 개의 출처를 비교해보세요.",
      },
      {
        label: "C",
        text: "확인 어려우면 대충 빼버린다(학습 포기)",
        score: 1,
        feedback:
          "검증을 포기하면 학습 기회를 놓칠 수 있어요. 작은 검증부터 시작해보세요.",
        alternative: "모르는 부분은 질문을 남기고 조사 계획을 세워요.",
      },
    ],
  },
  {
    id: "mission-6",
    topic: "딥페이크/책임",
    competency: "Responsibility",
    situation: "친구 얼굴로 만든 합성 영상이 단톡에 올라왔다.",
    choices: [
      {
        label: "A",
        text: "공유하지 않고 문제를 알린다",
        score: 2,
        feedback:
          "딥페이크는 피해를 줄 수 있어요. 공유를 멈추고 문제를 알리는 게 책임 있는 행동입니다.",
        alternative: "피해자가 느낄 감정을 생각해 보고 대화를 시도해요.",
      },
      {
        label: "B",
        text: "재미로 한 번만 공유한다",
        score: 1,
        feedback:
          "단 한 번의 공유도 피해를 확산시킬 수 있어요.",
        alternative: "재미보다 안전을 우선해 공유를 멈추세요.",
      },
      {
        label: "C",
        text: "조회수 올리려고 퍼뜨린다",
        score: 0,
        feedback:
          "피해 확산을 의도하는 행동은 책임성과 윤리에 어긋납니다.",
        alternative: "문제가 되는 콘텐츠는 신고하는 것이 바람직합니다.",
      },
    ],
  },
];

const competencyLabels = {
  Privacy: "개인정보",
  Fairness: "공정성",
  Transparency: "투명성",
  Responsibility: "책임",
};

const state = {
  currentScreenIndex: 0,
  preAnswers: {},
  postAnswers: {},
  missionAnswers: [],
  missionIndex: 0,
  promise: "",
};

const progressText = document.getElementById("progressText");

const startButton = document.getElementById("startButton");
const preNextButton = document.getElementById("preNextButton");
const missionNextButton = document.getElementById("missionNextButton");
const postNextButton = document.getElementById("postNextButton");
const reportNextButton = document.getElementById("reportNextButton");
const savePromiseButton = document.getElementById("savePromiseButton");
const promiseSaved = document.getElementById("promiseSaved");
const downloadCsvButton = document.getElementById("downloadCsvButton");

const missionTag = document.getElementById("missionTag");
const missionTopic = document.getElementById("missionTopic");
const missionSituation = document.getElementById("missionSituation");
const missionChoices = document.getElementById("missionChoices");
const missionFeedback = document.getElementById("missionFeedback");
const missionScore = document.getElementById("missionScore");
const missionExplanation = document.getElementById("missionExplanation");
const missionAlternative = document.getElementById("missionAlternative");

const competencyBars = document.getElementById("competencyBars");
const hardestQuestion = document.getElementById("hardestQuestion");
const classAverage = document.getElementById("classAverage");
const questionDistribution = document.getElementById("questionDistribution");
const postComparisonBars = document.getElementById("postComparisonBars");

const likertScale = [
  { label: "1 전혀 아니다", value: 1 },
  { label: "2 그렇지 않다", value: 2 },
  { label: "3 그렇다", value: 3 },
  { label: "4 매우 그렇다", value: 4 },
];

const showScreen = (index) => {
  state.currentScreenIndex = index;
  screens.forEach((screen, idx) => {
    const element = document.getElementById(screen.id);
    if (element) {
      element.classList.toggle("active", idx === index);
    }
  });
  progressText.textContent = screens[index]?.label || "";
};

const createLikertQuestion = (question, answers, onSelect) => {
  const container = document.createElement("div");
  container.className = "question";

  const title = document.createElement("h4");
  title.textContent = question.text;

  const scale = document.createElement("div");
  scale.className = "likert";

  likertScale.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      answers[question.id] = option.value;
      Array.from(scale.children).forEach((child) =>
        child.classList.remove("selected")
      );
      button.classList.add("selected");
      onSelect();
    });
    scale.appendChild(button);
  });

  container.appendChild(title);
  container.appendChild(scale);
  return container;
};

const renderQuestions = (containerId, questions, answers, onCompleteChange) => {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  questions.forEach((question) => {
    const element = createLikertQuestion(question, answers, onCompleteChange);
    container.appendChild(element);
  });
};

const isSurveyComplete = (questions, answers) =>
  questions.every((question) => answers[question.id]);

const updateSurveyButtons = () => {
  preNextButton.disabled = !isSurveyComplete(preQuestions, state.preAnswers);
  postNextButton.disabled = !isSurveyComplete(postQuestions, state.postAnswers);
  if (postComparisonBars) {
    if (isSurveyComplete(postQuestions, state.postAnswers)) {
      renderPostComparison();
    } else {
      postComparisonBars.innerHTML =
        "<p class=\"note\">모든 문항을 응답하면 변화가 표시됩니다.</p>";
    }
  }
};

const loadMission = () => {
  const mission = missions[state.missionIndex];
  missionTag.textContent = `미션 ${state.missionIndex + 1}`;
  missionTopic.textContent = mission.topic;
  missionSituation.textContent = mission.situation;
  missionChoices.innerHTML = "";
  missionFeedback.classList.remove("visible");
  missionNextButton.disabled = true;

  mission.choices.forEach((choice, idx) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = `${choice.label}) ${choice.text}`;
    button.addEventListener("click", () => {
      Array.from(missionChoices.children).forEach((child) =>
        child.classList.remove("selected")
      );
      button.classList.add("selected");
      state.missionAnswers[state.missionIndex] = {
        missionId: mission.id,
        choiceIndex: idx,
        score: choice.score,
        competency: mission.competency,
      };
      missionScore.textContent = choice.score;
      missionExplanation.textContent = choice.feedback;
      missionAlternative.textContent = `대안: ${choice.alternative}`;
      missionFeedback.classList.add("visible");
      missionNextButton.disabled = false;
    });
    missionChoices.appendChild(button);
  });
};

const scoreSurvey = (questions, answers) => {
  return questions.reduce((sum, question) => {
    const value = answers[question.id];
    if (!value) return sum;
    const adjusted = question.reverse ? 5 - value : value;
    return sum + adjusted;
  }, 0);
};

const buildCompetencyScores = () => {
  const scores = {
    Privacy: 0,
    Fairness: 0,
    Transparency: 0,
    Responsibility: 0,
  };
  const counts = { ...scores };

  state.missionAnswers.forEach((answer) => {
    if (!answer) return;
    scores[answer.competency] += answer.score;
    counts[answer.competency] += 1;
  });

  Object.keys(scores).forEach((key) => {
    if (counts[key] > 0) {
      scores[key] = (scores[key] / (counts[key] * 2)) * 100;
    } else {
      scores[key] = 0;
    }
  });

  return scores;
};

const renderCompetencyBars = () => {
  const scores = buildCompetencyScores();
  competencyBars.innerHTML = "";

  Object.entries(scores).forEach(([key, value]) => {
    const container = document.createElement("div");
    container.className = "bar";

    const label = document.createElement("div");
    label.textContent = `${competencyLabels[key]} ${Math.round(value)}%`;

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = `${value}%`;

    track.appendChild(fill);
    container.appendChild(label);
    container.appendChild(track);
    competencyBars.appendChild(container);
  });
};

const renderHardestQuestion = () => {
  const lowest = state.missionAnswers.reduce(
    (current, answer, idx) => {
      if (!answer) return current;
      if (!current || answer.score < current.score) {
        return { ...answer, index: idx };
      }
      return current;
    },
    null
  );

  if (!lowest) return;
  const mission = missions[lowest.index];
  hardestQuestion.innerHTML = `
    <h3>내가 어려웠던 문항 TOP1</h3>
    <p><strong>미션 ${lowest.index + 1}</strong> · ${mission.situation}</p>
    <p>선택한 답: ${mission.choices[lowest.choiceIndex].text}</p>
    <p class="note">다음에는 더 윤리적인 선택을 해볼 수 있어요.</p>
  `;
};

const renderClassAverage = () => {
  const preScore = scoreSurvey(preQuestions, state.preAnswers);
  const postScore = scoreSurvey(postQuestions, state.postAnswers);
  const maxScore = preQuestions.length * 4;

  classAverage.innerHTML = `
    <div class="average-row">
      <span>사전 평균</span>
      <span>${preScore} / ${maxScore}</span>
    </div>
    <div class="average-row">
      <span>사후 평균</span>
      <span>${postScore} / ${maxScore}</span>
    </div>
  `;
};

const renderDistribution = () => {
  questionDistribution.innerHTML = "";
  state.missionAnswers.forEach((answer, idx) => {
    if (!answer) return;
    const item = document.createElement("div");
    item.className = "distribution-item";
    item.innerHTML = `
      <strong>미션 ${idx + 1}</strong>
      <div class="distribution-bar">
        <div class="distribution-fill" style="width: ${(answer.score / 2) * 100}%"></div>
      </div>
      <p class="note">선택지 ${missions[idx].choices[answer.choiceIndex].label} · 점수 ${answer.score}</p>
    `;
    questionDistribution.appendChild(item);
  });
};

const renderPostComparison = () => {
  const preScore = scoreSurvey(preQuestions, state.preAnswers);
  const postScore = scoreSurvey(postQuestions, state.postAnswers);
  const maxScore = preQuestions.length * 4;
  const delta = postScore - preScore;
  const direction = delta >= 0 ? "▲" : "▼";
  const deltaText = `${direction} ${Math.abs(delta)}점`;

  postComparisonBars.innerHTML = `
    <div class="average-row">
      <span>사전 점수</span>
      <span>${preScore} / ${maxScore}</span>
    </div>
    <div class="average-row">
      <span>사후 점수</span>
      <span>${postScore} / ${maxScore}</span>
    </div>
    <div class="average-row">
      <span>변화</span>
      <span>${deltaText}</span>
    </div>
  `;
};

const prepareDashboard = () => {
  renderClassAverage();
  renderDistribution();
};

const downloadCsv = () => {
  const rows = [
    ["이름", document.getElementById("studentName").value],
    ["학급 코드", document.getElementById("classCode").value],
    ["사전 점수", scoreSurvey(preQuestions, state.preAnswers)],
    ["사후 점수", scoreSurvey(postQuestions, state.postAnswers)],
  ];

  state.missionAnswers.forEach((answer, idx) => {
    if (!answer) return;
    rows.push([
      `미션 ${idx + 1}`,
      missions[idx].choices[answer.choiceIndex].label,
      answer.score,
    ]);
  });

  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ethics-pick.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

startButton.addEventListener("click", () => {
  showScreen(1);
});

preNextButton.addEventListener("click", () => {
  state.missionIndex = 0;
  loadMission();
  showScreen(2);
});

missionNextButton.addEventListener("click", () => {
  if (state.missionIndex < missions.length - 1) {
    state.missionIndex += 1;
    loadMission();
  } else {
    showScreen(3);
  }
});

postNextButton.addEventListener("click", () => {
  renderCompetencyBars();
  renderHardestQuestion();
  showScreen(4);
});

reportNextButton.addEventListener("click", () => {
  prepareDashboard();
  showScreen(5);
});

savePromiseButton.addEventListener("click", () => {
  const promiseInput = document.getElementById("promiseInput");
  state.promise = promiseInput.value.trim();
  promiseSaved.textContent =
    state.promise.length > 0
      ? `저장 완료: “${state.promise}”`
      : "약속을 입력해 주세요.";
});

downloadCsvButton.addEventListener("click", downloadCsv);

renderQuestions("preQuestions", preQuestions, state.preAnswers, updateSurveyButtons);
renderQuestions("postQuestions", postQuestions, state.postAnswers, updateSurveyButtons);
updateSurveyButtons();
loadMission();
showScreen(0);
