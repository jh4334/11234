import { useState, useRef } from "react";
import { consentItems } from "../data/consentItems";

export default function ConsentGame({ onComplete, onExit }) {
  const [idx, setIdx] = useState(0);
  const [swiped, setSwiped] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const cardRef = useRef(null);

  const item = consentItems[idx];
  const progress = ((idx + (swiped !== null ? 1 : 0)) / consentItems.length) * 100;

  const handleSwipe = (accept) => {
    if (swiped !== null) return;
    setSwiped(accept);

    const correct = accept === item.shouldAccept;
    const pts = correct ? 2 : 0;
    setTotalScore((s) => s + pts);
    setResults((r) => [...r, { id: item.id, accepted: accept, correct, score: pts }]);
  };

  const handleTouchStart = (e) => {
    if (swiped !== null) return;
    startX.current = e.touches[0].clientX;
    setDragging(true);
  };

  const handleMouseDown = (e) => {
    if (swiped !== null) return;
    startX.current = e.clientX;
    setDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!dragging || swiped !== null) return;
    const diff = e.touches[0].clientX - startX.current;
    setDragX(diff);
  };

  const handleMouseMove = (e) => {
    if (!dragging || swiped !== null) return;
    const diff = e.clientX - startX.current;
    setDragX(diff);
  };

  const handleEnd = () => {
    if (!dragging || swiped !== null) return;
    setDragging(false);

    if (dragX > 80) {
      handleSwipe(true);
    } else if (dragX < -80) {
      handleSwipe(false);
    }
    setDragX(0);
  };

  const handleNext = () => {
    if (idx + 1 >= consentItems.length) {
      onComplete({ totalScore, results });
    } else {
      setIdx((i) => i + 1);
      setSwiped(null);
      setDragX(0);
    }
  };

  const isCorrect = swiped !== null && swiped === item.shouldAccept;
  const rotation = dragX * 0.1;
  const opacity = Math.max(0.5, 1 - Math.abs(dragX) / 300);

  const cardStyle = swiped !== null
    ? {
        transform: `translateX(${swiped ? 300 : -300}px) rotate(${swiped ? 20 : -20}deg)`,
        opacity: 0,
        transition: "all 0.4s ease"
      }
    : {
        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        opacity,
        transition: dragging ? "none" : "all 0.3s ease"
      };

  return (
    <div
      className="game-page"
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {totalScore}점</div>
        <div className="hud-mission">{idx + 1} / {consentItems.length}</div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      <div className="swipe-hint">
        <span className="swipe-hint-left">← 거부</span>
        <span className="swipe-hint-right">허용 →</span>
      </div>

      <div
        ref={cardRef}
        className="consent-card"
        style={cardStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
      >
        {dragX < -30 && swiped === null && (
          <div className="swipe-indicator reject">✕ 거부</div>
        )}
        {dragX > 30 && swiped === null && (
          <div className="swipe-indicator accept">✓ 허용</div>
        )}

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
          <p className="swipe-drag-hint">👆 카드를 좌우로 스와이프하세요!</p>
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
