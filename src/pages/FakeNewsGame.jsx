import { useState, useEffect, useRef } from "react";
import { fakeNewsItems } from "../data/fakeNewsItems";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TIME_LIMIT = 60;

export default function FakeNewsGame({ onComplete, onExit }) {
  const [items] = useState(() => shuffle(fakeNewsItems));
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (finished) {
      const timeBonus = timeLeft >= 30 ? 2 : timeLeft >= 15 ? 1 : 0;
      const finalScore = Math.max(0, score + timeBonus);
      onComplete({ totalScore: finalScore, answered: correct + wrong, correct, timeLeft });
    }
  }, [finished]);

  const item = items[idx];

  const handleAnswer = (guessFake) => {
    if (feedback || finished) return;

    const isCorrect = guessFake === item.isFake;
    if (isCorrect) {
      setScore((s) => s + 1);
      setCorrect((c) => c + 1);
    } else {
      setScore((s) => Math.max(0, s - 1));
      setWrong((w) => w + 1);
    }

    setFeedback({ isCorrect, item });

    setTimeout(() => {
      if (idx + 1 >= items.length) {
        clearInterval(timerRef.current);
        setFinished(true);
      } else {
        setIdx((i) => i + 1);
        setFeedback(null);
      }
    }, 1200);
  };

  const timerPct = (timeLeft / TIME_LIMIT) * 100;
  const timerColor = timeLeft <= 10 ? "#ef4444" : timeLeft <= 20 ? "#f59e0b" : "#10b981";

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {score}점</div>
        <div className="hud-mission">✓{correct} ✗{wrong}</div>
      </div>

      <div className="fn-timer-bar">
        <div
          className="fn-timer-fill"
          style={{ width: `${timerPct}%`, background: timerColor }}
        />
        <span className="fn-timer-text">⏱️ {timeLeft}초</span>
      </div>

      {!finished && item && (
        <div className="fn-card">
          <div className="fn-source">{item.source}</div>
          <h2 className="fn-headline">{item.headline}</h2>

          {feedback && (
            <div className={`fn-feedback ${feedback.isCorrect ? "fn-correct" : "fn-wrong"}`}>
              {feedback.isCorrect ? "✓ 정답!" : "✗ 틀림!"}
              <span className="fn-reason">{item.reason}</span>
            </div>
          )}

          <div className="fn-buttons">
            <button
              className="fn-btn fn-real"
              onClick={() => handleAnswer(false)}
              disabled={feedback !== null}
            >
              📰 진짜 뉴스
            </button>
            <button
              className="fn-btn fn-fake"
              onClick={() => handleAnswer(true)}
              disabled={feedback !== null}
            >
              🚫 가짜 뉴스
            </button>
          </div>
        </div>
      )}

      {finished && (
        <div className="fn-result">
          <div className="fn-result-emoji">⏰</div>
          <h2>타임 오버!</h2>
          <p className="fn-result-stats">
            {correct + wrong}개 중 {correct}개 정답
          </p>
        </div>
      )}
    </div>
  );
}
