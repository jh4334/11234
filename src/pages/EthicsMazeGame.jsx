import { useState } from "react";
import { mazeStory } from "../data/mazeStory";

export default function EthicsMazeGame({ onComplete, onExit }) {
  const [currentNode, setCurrentNode] = useState("start");
  const [history, setHistory] = useState(["start"]);
  const [totalScore, setTotalScore] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const node = mazeStory.nodes[currentNode];

  const handleChoice = (choice) => {
    const pts = choice.score || 0;
    setTotalScore((s) => s + pts);
    setHistory((h) => [...h, choice.next]);
    setCurrentNode(choice.next);
  };

  const handleFinish = () => {
    onComplete({
      totalScore,
      path: history,
      badge: node.badge,
      finalNode: currentNode
    });
  };

  if (showIntro) {
    return (
      <div className="game-page">
        <div className="maze-intro">
          <div className="maze-intro-emoji">🗺️</div>
          <h1 className="maze-intro-title">{mazeStory.title}</h1>
          <p className="maze-intro-text">{mazeStory.intro}</p>
          <button className="btn-start-maze" onClick={() => setShowIntro(false)}>
            <span>조사 시작하기</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {totalScore}점</div>
        <div className="hud-mission">📍 {history.length}번째 선택</div>
      </div>

      <div className="maze-path">
        {history.map((nodeId, i) => (
          <span key={i} className="maze-path-dot">
            {mazeStory.nodes[nodeId]?.emoji || "•"}
          </span>
        ))}
      </div>

      <div className={`maze-card ${node.isEnd ? "maze-end" : ""}`}>
        <div className="maze-node-emoji">{node.emoji}</div>
        <p className="maze-node-text">{node.text}</p>

        {node.isEnd ? (
          <div className="maze-ending">
            <div className="maze-badge">
              <span className="maze-badge-icon">🏆</span>
              <span className="maze-badge-title">{node.badge}</span>
            </div>
            <div className="maze-final-score">
              최종 점수: <strong>{totalScore}점</strong>
            </div>
            <button className="btn-next" onClick={handleFinish}>
              결과 보기 →
            </button>
          </div>
        ) : (
          <div className="maze-choices">
            {node.choices.map((choice, i) => (
              <button
                key={i}
                className="maze-choice-btn"
                onClick={() => handleChoice(choice)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {!node.isEnd && (
        <p className="maze-hint">💡 당신의 선택이 이야기를 바꿔요!</p>
      )}
    </div>
  );
}
