import { useState, useEffect } from "react";
import { privacyItems } from "../data/privacyItems";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PrivacyGuardGame({ onComplete, onExit }) {
  const [items] = useState(() => shuffle(privacyItems));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [privateBox, setPrivateBox] = useState([]);
  const [publicBox, setPublicBox] = useState([]);

  const item = items[idx];
  const progress = ((idx + (selected !== null ? 1 : 0)) / items.length) * 100;

  const handleDrop = (isPrivate) => {
    if (selected !== null) return;
    setSelected(isPrivate);

    const correct = isPrivate === item.isPrivate;
    const pts = correct ? 2 : 0;
    setTotalScore((s) => s + pts);
    setResults((r) => [...r, { id: item.id, choice: isPrivate, correct, score: pts }]);

    if (isPrivate) {
      setPrivateBox((b) => [...b, item]);
    } else {
      setPublicBox((b) => [...b, item]);
    }
  };

  const handleNext = () => {
    if (idx + 1 >= items.length) {
      onComplete({ totalScore, results, privateBox, publicBox });
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const isCorrect = selected !== null && selected === item.isPrivate;

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {totalScore}점</div>
        <div className="hud-mission">{idx + 1} / {items.length}</div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      <div className="privacy-info-card">
        <div className="privacy-emoji">{item.emoji}</div>
        <div className="privacy-category">{item.category}</div>
        <h2 className="privacy-info-text">{item.info}</h2>
        <p className="privacy-question">이 정보를 인터넷에 공개해도 될까요?</p>
      </div>

      {selected === null && (
        <div className="privacy-boxes">
          <button className="privacy-box private" onClick={() => handleDrop(true)}>
            <span className="privacy-box-icon">🔒</span>
            <span className="privacy-box-label">비공개</span>
            <span className="privacy-box-desc">절대 공개 금지!</span>
          </button>
          <button className="privacy-box public" onClick={() => handleDrop(false)}>
            <span className="privacy-box-icon">🌐</span>
            <span className="privacy-box-label">공개 가능</span>
            <span className="privacy-box-desc">공유해도 괜찮아요</span>
          </button>
        </div>
      )}

      {selected !== null && (
        <div className={`feedback-panel ${isCorrect ? "score-bg-great" : "score-bg-wrong"}`}>
          <div className="feedback-emoji">{isCorrect ? "🎉" : "🤔"}</div>
          <div className={`feedback-label ${isCorrect ? "label-great" : "label-wrong"}`}>
            {isCorrect ? "정답! +2점" : "틀렸어요"}
          </div>
          <p className="feedback-text">
            {item.isPrivate ? "🔒 비공개해야 해요!" : "🌐 공개해도 괜찮아요!"}
          </p>
          <p className="feedback-hint">💡 {item.reason}</p>
          <button className="btn-next" onClick={handleNext}>
            {idx + 1 >= items.length ? "결과 보기 →" : "다음 →"}
          </button>
        </div>
      )}

      <div className="privacy-summary">
        <div className="privacy-summary-box">
          <span>🔒 {privateBox.length}</span>
        </div>
        <div className="privacy-summary-box">
          <span>🌐 {publicBox.length}</span>
        </div>
      </div>
    </div>
  );
}
