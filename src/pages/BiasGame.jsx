import { useState } from "react";
import { biasScenarios } from "../data/biasScenarios";

export default function BiasGame({ onComplete, onExit }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const scenario = biasScenarios[idx];
  const progress = ((idx + (selected !== null ? 1 : 0)) / biasScenarios.length) * 100;

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const decision = scenario.decisions[i];
    const pts = decision.isBiased ? 2 : 0;
    setTotalScore((s) => s + pts);
    setResults((r) => [...r, { id: scenario.id, choiceIdx: i, correct: decision.isBiased, score: pts }]);
  };

  const handleNext = () => {
    if (idx + 1 >= biasScenarios.length) {
      onComplete({ totalScore, results });
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const selectedDecision = selected !== null ? scenario.decisions[selected] : null;

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {totalScore}점</div>
        <div className="hud-mission">{idx + 1} / {biasScenarios.length}</div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      <div className="mission-card">
        <div className="mission-emoji">{scenario.emoji}</div>
        <h2 className="mission-title">편향 찾기</h2>
        <p className="mission-scenario">{scenario.situation}</p>
        <p className="bias-instruction">다음 중 편향된(차별적인) 결정은?</p>

        <div className="bias-choices">
          {scenario.decisions.map((d, i) => (
            <button
              key={i}
              className={`bias-choice-btn ${
                selected === i
                  ? d.isBiased ? "correct" : "wrong"
                  : selected !== null ? "disabled" : ""
              }`}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              <span className="bias-choice-num">{i + 1}</span>
              <span className="bias-choice-text">{d.text}</span>
              {selected !== null && d.isBiased && (
                <span className="bias-marker">⚠️ 편향</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div className={`feedback-panel ${selectedDecision.isBiased ? "score-bg-great" : "score-bg-wrong"}`}>
          <div className="feedback-emoji">{selectedDecision.isBiased ? "🎉" : "🤔"}</div>
          <div className={`feedback-label ${selectedDecision.isBiased ? "label-great" : "label-wrong"}`}>
            {selectedDecision.isBiased ? "정답! +2점" : "틀렸어요"}
          </div>
          <p className="feedback-text">{scenario.explanation}</p>
          <button className="btn-next" onClick={handleNext}>
            {idx + 1 >= biasScenarios.length ? "결과 보기 →" : "다음 →"}
          </button>
        </div>
      )}
    </div>
  );
}
