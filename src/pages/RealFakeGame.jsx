import { useState } from "react";
import { realFakeItems } from "../data/realFakeItems";

export default function RealFakeGame({ onComplete, onExit }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const item = realFakeItems[idx];
  const progress = ((idx + (selected !== null ? 1 : 0)) / realFakeItems.length) * 100;

  const handleSelect = (guessAI) => {
    if (selected !== null) return;
    setSelected(guessAI);
    const correct = guessAI === item.isAI;
    const pts = correct ? 1 : 0;
    setTotalScore((s) => s + pts);
    setResults((r) => [...r, { id: item.id, guessAI, correct, score: pts }]);
  };

  const handleNext = () => {
    if (idx + 1 >= realFakeItems.length) {
      onComplete({ totalScore, results });
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const isCorrect = selected !== null && selected === item.isAI;

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {totalScore}점</div>
        <div className="hud-mission">{idx + 1} / {realFakeItems.length}</div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      <div className="mission-card">
        <div className="mission-emoji">🔍</div>
        <h2 className="mission-title">진짜 vs AI</h2>
        <p className="rf-instruction">이 글을 쓴 건 누구일까요?</p>

        <div className="rf-content-box">
          <p className="rf-content">{item.content}</p>
        </div>

        <div className="rf-choices">
          <button
            className={`rf-btn rf-human ${
              selected !== null
                ? (!item.isAI ? "correct" : selected === false ? "selected-wrong" : "")
                : ""
            }`}
            onClick={() => handleSelect(false)}
            disabled={selected !== null}
          >
            <span className="rf-icon">👤</span>
            <span>사람이 썼어요</span>
          </button>
          <button
            className={`rf-btn rf-ai ${
              selected !== null
                ? (item.isAI ? "correct" : selected === true ? "selected-wrong" : "")
                : ""
            }`}
            onClick={() => handleSelect(true)}
            disabled={selected !== null}
          >
            <span className="rf-icon">🤖</span>
            <span>AI가 썼어요</span>
          </button>
        </div>
      </div>

      {selected !== null && (
        <div className={`feedback-panel ${isCorrect ? "score-bg-great" : "score-bg-wrong"}`}>
          <div className="feedback-emoji">{isCorrect ? "🎉" : "😅"}</div>
          <div className={`feedback-label ${isCorrect ? "label-great" : "label-wrong"}`}>
            {isCorrect ? "정답! +1점" : "틀렸어요"}
          </div>
          <p className="feedback-text">
            <strong>{item.isAI ? "🤖 AI가 쓴 글" : "👤 사람이 쓴 글"}</strong>이에요.
          </p>
          <p className="feedback-hint">💡 {item.hint}</p>
          <button className="btn-next" onClick={handleNext}>
            {idx + 1 >= realFakeItems.length ? "결과 보기 →" : "다음 →"}
          </button>
        </div>
      )}
    </div>
  );
}
