import { useState, useEffect } from "react";
import StartPage from "./pages/StartPage";
import SurveyPage from "./pages/SurveyPage";
import MissionPage from "./pages/MissionPage";
import ResultPage from "./pages/ResultPage";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import { preSurveyQuestions, postSurveyQuestions } from "./data/surveys";
import "./App.css";

const STORAGE_KEY = "ethics-pick-data";
const RESULTS_KEY = "ethics-pick-results";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadAllResults() {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveResult(entry) {
  const results = loadAllResults();
  // 같은 이름+타임스탬프가 없으면 추가
  const exists = results.some(
    (r) => r.name === entry.name && r.timestamp === entry.timestamp
  );
  if (!exists) {
    results.push(entry);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  }
}

export function clearAllResults() {
  localStorage.removeItem(RESULTS_KEY);
}

const STEPS = {
  START: "start",
  PRE_SURVEY: "preSurvey",
  MISSIONS: "missions",
  POST_SURVEY: "postSurvey",
  RESULT: "result",
  TEACHER_LOGIN: "teacherLogin",
  TEACHER_DASHBOARD: "teacherDashboard",
};

export default function App() {
  const [step, setStep] = useState(STEPS.START);
  const [data, setData] = useState({
    name: "",
    preSurvey: null,
    missionResults: [],
    postSurvey: null,
    pledge: "",
    timestamp: null,
  });

  useEffect(() => {
    const saved = loadData();
    if (saved && saved.name) {
      setData(saved);
      if (saved.pledge) setStep(STEPS.RESULT);
      else if (saved.postSurvey) setStep(STEPS.RESULT);
      else if (saved.missionResults?.length === 6) setStep(STEPS.POST_SURVEY);
      else if (saved.preSurvey) setStep(STEPS.MISSIONS);
      else setStep(STEPS.PRE_SURVEY);
    }
  }, []);

  const update = (partial) => {
    setData((prev) => {
      const next = { ...prev, ...partial };
      saveData(next);
      return next;
    });
  };

  const handleStart = (name) => {
    const timestamp = new Date().toISOString();
    update({ name, timestamp });
    setStep(STEPS.PRE_SURVEY);
  };

  const handlePreSurvey = (answers) => {
    update({ preSurvey: answers });
    setStep(STEPS.MISSIONS);
  };

  const handleMissions = (results) => {
    update({ missionResults: results });
    setStep(STEPS.POST_SURVEY);
  };

  const handlePostSurvey = (answers) => {
    update({ postSurvey: answers });
    setStep(STEPS.RESULT);
  };

  const handlePledge = (pledge) => {
    const updated = { ...data, pledge };
    update({ pledge });
    // 결과 완료 시 전체 결과 목록에 저장
    saveResult(updated);
  };

  const handleReset = () => {
    // 현재 결과가 있으면 저장 후 초기화
    if (data.missionResults?.length === 6) {
      saveResult(data);
    }
    localStorage.removeItem(STORAGE_KEY);
    setData({
      name: "",
      preSurvey: null,
      missionResults: [],
      postSurvey: null,
      pledge: "",
      timestamp: null,
    });
    setStep(STEPS.START);
  };

  const handleTeacherMode = () => {
    setStep(STEPS.TEACHER_LOGIN);
  };

  const handleTeacherAuth = () => {
    setStep(STEPS.TEACHER_DASHBOARD);
  };

  const handleTeacherBack = () => {
    setStep(STEPS.START);
  };

  return (
    <div className="app">
      {step === STEPS.START && (
        <StartPage onNext={handleStart} onTeacherMode={handleTeacherMode} />
      )}
      {step === STEPS.PRE_SURVEY && (
        <SurveyPage
          title="사전 설문"
          questions={preSurveyQuestions}
          onNext={handlePreSurvey}
        />
      )}
      {step === STEPS.MISSIONS && <MissionPage onComplete={handleMissions} />}
      {step === STEPS.POST_SURVEY && (
        <SurveyPage
          title="사후 설문"
          questions={postSurveyQuestions}
          onNext={handlePostSurvey}
        />
      )}
      {step === STEPS.RESULT && (
        <ResultPage
          name={data.name}
          missionResults={data.missionResults}
          onSavePledge={handlePledge}
          onReset={handleReset}
        />
      )}
      {step === STEPS.TEACHER_LOGIN && (
        <TeacherLogin onAuth={handleTeacherAuth} onBack={handleTeacherBack} />
      )}
      {step === STEPS.TEACHER_DASHBOARD && (
        <TeacherDashboard onBack={handleTeacherBack} />
      )}
    </div>
  );
}
