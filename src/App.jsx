import { useState, useEffect } from "react";
import StartPage from "./pages/StartPage";
import SurveyPage from "./pages/SurveyPage";
import MissionPage from "./pages/MissionPage";
import ResultPage from "./pages/ResultPage";
import { preSurveyQuestions, postSurveyQuestions } from "./data/surveys";
import "./App.css";

const STORAGE_KEY = "ethics-pick-data";

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

const STEPS = {
  START: "start",
  PRE_SURVEY: "preSurvey",
  MISSIONS: "missions",
  POST_SURVEY: "postSurvey",
  RESULT: "result",
};

export default function App() {
  const [step, setStep] = useState(STEPS.START);
  const [data, setData] = useState({
    name: "",
    preSurvey: null,
    missionResults: [],
    postSurvey: null,
    pledge: "",
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
    update({ name });
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
    update({ pledge });
  };

  return (
    <div className="app">
      {step === STEPS.START && <StartPage onNext={handleStart} />}
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
        />
      )}
    </div>
  );
}
