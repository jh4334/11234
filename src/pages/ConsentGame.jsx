import { useState } from "react";
import { consentItems } from "../data/consentItems";

export default function ConsentGame({ onComplete, onExit }) {
  const [idx, setIdx] = useState(0);
  const [swiped, setSwiped] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [animDir, setAnimDir] = useState(null);

  const item = consentItems[idx];
  const progress = ((idx + (swiped !== null ? 1 : 0)) / consentItems.length) * 100;

  const handleSwipe = (accept) => {
    if (swiped !== null) return;

    setAnimDir(accept ? "right" : "left");
    setSwiped(accept);

    const correct = accept === item.shouldAccept;
    const pts = correct ? 2 : 0;
    setTotalScore((s) => s + pts);
    setResults((r) => [...r, { id: item.id, accepted: accept, correct, score: pts }]);
  };

  const handleNext = () => {
    if (idx + 1 >= consentItems.length) {
      onComplete({ totalScore, results });
    } else {
      setIdx((i) => i + 1);
      setSwiped(null);
      setAnimDir(null);
    }
  };

  const isCorrect = swiped !== null && swiped === item.shouldAccept;

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {totalScore}점</div>
        <div className="hud-mission">{idx + 1} / {consentItems.length}</div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      <div className={`consent-card ${animDir ? `swipe-${animDir}` : ""}`}>
        <div className="consent-app">
          <span className="consent-emoji">{item.emoji}</span>
          <span className="consent-app-name">{item.app}</span>
        </div>

        <div className="consent-request">
          <p className="consent-ask">📋 요청 권한</p>
          <p className="consent-text">{item.request}</p>
        </div>

        <div className="consent-purpose">
          <p className="consent-why">💬 목적</p>
          <p className="consent-purpose-text">"{item.purpose}"</p>
        </div>

        {swiped === null && (
          <div className="consent-buttons">
            <button
              className="consent-btn consent-reject"
              onClick={() => handleSwipe(false)}
            >
              <span className="consent-btn-icon">✕</span>
              <span>거부</span>
            </button>
            <button
              className="consent-btn consent-accept"
              onClick={() => handleSwipe(true)}
            >
              <span className="consent-btn-icon">✓</span>
              <span>허용</span>
            </button>
          </div>
        )}

        {swiped !== null && (
          <div className={`consent-result ${isCorrect ? "consent-correct" : "consent-wrong"}`}>
            <span className="consent-result-icon">
              {isCorrect ? "⭕" : "❌"}
            </span>
            <span>{isCorrect ? "좋은 판단!" : "다시 생각해봐요"}</span>
          </div>
        )}
      </div>

      {swiped !== null && (
        <div className={`feedback-panel ${isCorrect ? "score-bg-great" : "score-bg-wrong"}`}>
          <div className="feedback-emoji">{isCorrect ? "🎉" : "🤔"}</div>
          <div className={`feedback-label ${isCorrect ? "label-great" : "label-wrong"}`}>
            {isCorrect ? "정답! +2점" : "틀렸어요"}
          </div>
          <p className="feedback-text">
            {item.shouldAccept ? "✓ 허용해도 괜찮아요" : "✕ 거부하는 게 좋아요"}
          </p>
          <p className="feedback-hint">💡 {item.reason}</p>
          <button className="btn-next" onClick={handleNext}>
            {idx + 1 >= consentItems.length ? "결과 보기 →" : "다음 →"}
          </button>
        </div>
      )}
    </div>
  );
}
