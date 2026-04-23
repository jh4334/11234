import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import "./App.css";

const RESULTS_KEY = "ethics-pick-results";

function saveResult(entry) {
  try {
    const all = JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]");
    all.push(entry);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(all));
  } catch {}
}

const STEP = { LANDING: 0, GAME: 1, RESULT: 2, TEACHER_LOGIN: 3, TEACHER: 4 };

export default function App() {
  const [step, setStep] = useState(STEP.LANDING);
  const [gameData, setGameData] = useState(null);

  const handleGameComplete = (data) => {
    const entry = { ...data, timestamp: new Date().toISOString(), pledge: "" };
    setGameData(entry);
    setStep(STEP.RESULT);
  };

  const handlePledge = (pledge) => {
    const entry = { ...gameData, pledge };
    setGameData(entry);
    saveResult(entry);
  };

  const handleRestart = () => {
    setGameData(null);
    setStep(STEP.LANDING);
  };

  return (
    <div className="app-root">
      {step === STEP.LANDING && (
        <LandingPage onStart={() => setStep(STEP.GAME)} onTeacher={() => setStep(STEP.TEACHER_LOGIN)} />
      )}
      {step === STEP.GAME && (
        <GamePage onComplete={handleGameComplete} />
      )}
      {step === STEP.RESULT && gameData && (
        <ResultPage
          totalScore={gameData.totalScore}
          results={gameData.results}
          onRestart={handleRestart}
          onSavePledge={handlePledge}
        />
      )}
      {step === STEP.TEACHER_LOGIN && (
        <TeacherLogin onAuth={() => setStep(STEP.TEACHER)} onBack={() => setStep(STEP.LANDING)} />
      )}
      {step === STEP.TEACHER && (
        <TeacherDashboard onBack={() => setStep(STEP.LANDING)} />
      )}
    </div>
  );
}
