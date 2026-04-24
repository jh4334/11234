import { useState, useEffect } from "react";
import GameHub from "./pages/GameHub";
import ChoiceGame from "./pages/ChoiceGame";
import TermMatchGame from "./pages/TermMatchGame";
import ChatbotGuardGame from "./pages/ChatbotGuardGame";
import BiasGame from "./pages/BiasGame";
import RealFakeGame from "./pages/RealFakeGame";
import FakeNewsGame from "./pages/FakeNewsGame";
import ConsentGame from "./pages/ConsentGame";
import GameComplete from "./pages/GameComplete";
import FinalResult from "./pages/FinalResult";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import { getGame } from "./data/games";
import "./App.css";

const SESSION_KEY = "ethics-pick-session";
const RESULTS_KEY = "ethics-pick-results";

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
  } catch { return {}; }
}

function saveSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function saveResult(entry) {
  try {
    const all = JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]");
    all.push(entry);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(all));
  } catch {}
}

const STEP = {
  HUB: "hub",
  GAME: "game",
  COMPLETE: "complete",
  FINAL: "final",
  TEACHER_LOGIN: "tLogin",
  TEACHER: "teacher",
};

export default function App() {
  const [step, setStep] = useState(STEP.HUB);
  const [completed, setCompleted] = useState({}); // { gameKey: { score, details } }
  const [currentGame, setCurrentGame] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  // 최초 로드 시 진행 복구
  useEffect(() => {
    const s = loadSession();
    if (s && s.completed) setCompleted(s.completed);
  }, []);

  // 진행 상태 저장
  useEffect(() => {
    saveSession({ completed });
  }, [completed]);

  const handleSelect = (key) => {
    setCurrentGame(getGame(key));
    setStep(STEP.GAME);
  };

  const handleGameComplete = (payload) => {
    const newCompleted = {
      ...completed,
      [currentGame.key]: { score: payload.totalScore, details: payload },
    };
    setCompleted(newCompleted);
    setLastResult({ game: currentGame, score: payload.totalScore });
    setStep(STEP.COMPLETE);
  };

  const handleFinal = () => setStep(STEP.FINAL);

  const handleRestart = () => {
    setCompleted({});
    localStorage.removeItem(SESSION_KEY);
    setStep(STEP.HUB);
  };

  const handleHub = () => setStep(STEP.HUB);

  const handlePledge = (pledge) => {
    const entry = {
      timestamp: new Date().toISOString(),
      completed,
      pledge,
    };
    saveResult(entry);
  };

  return (
    <div className="app-root">
      {step === STEP.HUB && (
        <GameHub
          completed={completed}
          onSelect={handleSelect}
          onFinish={handleFinal}
          onTeacher={() => setStep(STEP.TEACHER_LOGIN)}
          onReset={handleRestart}
        />
      )}

      {step === STEP.GAME && currentGame?.key === "choice" && (
        <ChoiceGame onComplete={handleGameComplete} onExit={handleHub} />
      )}
      {step === STEP.GAME && currentGame?.key === "match" && (
        <TermMatchGame onComplete={handleGameComplete} onExit={handleHub} />
      )}
      {step === STEP.GAME && currentGame?.key === "chatbot" && (
        <ChatbotGuardGame onComplete={handleGameComplete} onExit={handleHub} />
      )}
      {step === STEP.GAME && currentGame?.key === "bias" && (
        <BiasGame onComplete={handleGameComplete} onExit={handleHub} />
      )}
      {step === STEP.GAME && currentGame?.key === "realfake" && (
        <RealFakeGame onComplete={handleGameComplete} onExit={handleHub} />
      )}
      {step === STEP.GAME && currentGame?.key === "fakenews" && (
        <FakeNewsGame onComplete={handleGameComplete} onExit={handleHub} />
      )}
      {step === STEP.GAME && currentGame?.key === "consent" && (
        <ConsentGame onComplete={handleGameComplete} onExit={handleHub} />
      )}

      {step === STEP.COMPLETE && lastResult && (
        <GameComplete
          game={lastResult.game}
          score={lastResult.score}
          onNext={handleHub}
        />
      )}

      {step === STEP.FINAL && (
        <FinalResult
          completed={completed}
          onRestart={handleRestart}
          onSavePledge={handlePledge}
          onHub={handleHub}
        />
      )}

      {step === STEP.TEACHER_LOGIN && (
        <TeacherLogin onAuth={() => setStep(STEP.TEACHER)} onBack={handleHub} />
      )}
      {step === STEP.TEACHER && (
        <TeacherDashboard onBack={handleHub} />
      )}
    </div>
  );
}
