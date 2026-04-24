import { useState } from "react";
import { fairAISteps } from "../data/fairAISteps";

export default function FairAIGame({ onComplete, onExit }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [fairnessLevel, setFairnessLevel] = useState(50);

  const step = fairAISteps[idx];
  const progress = ((idx + (selected !== null ? 1 : 0)) / fairAISteps.length) * 100;

  const handleSelect = (choiceIdx) => {
    if (selected !== null) return;
    setSelected(choiceIdx);

    const choice = step.choices[choiceIdx];
    setTotalScore((s) => s + choice.score);
    setResults((r) => [...r, { id: step.id, choiceIdx, score: choice.score }]);

    const delta = choice.score === 3 ? 10 : choice.score === 1 ? -5 : -15;
    setFairnessLevel((f) => Math.max(0, Math.min(100, f + delta)));
  };

  const handleNext = () => {
    if (idx + 1 >= fairAISteps.length) {
      onComplete({ totalScore, results, fairnessLevel });
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const selectedChoice = selected !== null ? step.choices[selected] : null;
  const isGreat = selectedChoice?.score === 3;
  const isOk = selectedChoice?.score === 1;

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>✕</button>
        <div className="hud-score">🎯 {totalScore}점</div>
        <div className="hud-mission">{idx + 1} / {fairAISteps.length}</div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      <div className="fairai-meter">
        <div className="fairai-meter-label">
          <span>⚖️ AI 공정성</span>
          <span className="fairai-meter-value">{fairnessLevel}%</span>
        </div>
        <div className="fairai-meter-track">
          <div
            className="fairai-meter-fill"
            style={{
              width: `${fairnessLevel}%`,
              background: fairnessLevel >= 70 ? "var(--green)" :
                         fairnessLevel >= 40 ? "var(--orange)" : "var(--red)"
            }}
          />
        </div>
      </div>

      <div className="fairai-card">
        <div className="fairai-phase">
          <span className="fairai-phase-emoji">{step.emoji}</span>
          <span className="fairai-phase-name">{step.phase}</span>
        </div>
        <p className="fairai-situation">{step.situation}</p>
        <h3 className="fairai-question">{step.question}</h3>

        <div className="fairai-choices">
          {step.choices.map((c, i) => (
            <button
              key={i}
              className={`fairai-choice-btn ${
                selected === i
                  ? c.score === 3 ? "great" : c.score === 1 ? "ok" : "wrong"
                  : selected !== null ? "disabled" : ""
              }`}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              {c.text}
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div className={`feedback-panel ${isGreat ? "score-bg-great" : isOk ? "score-bg-ok" : "score-bg-wrong"}`}>
          <div className="feedback-emoji">
            {isGreat ? "🎉" : isOk ? "😊" : "😅"}
          </div>
          <div className={`feedback-label ${isGreat ? "label-great" : isOk ? "label-ok" : "label-wrong"}`}>
            {isGreat ? `훌륭해요! +${selectedChoice.score}점` :
             isOk ? `괜찮아요 +${selectedChoice.score}점` : "아쉬워요"}
          </div>
          <p className="feedback-text">{selectedChoice.feedback}</p>
          <button className="btn-next" onClick={handleNext}>
            {idx + 1 >= fairAISteps.length ? "결과 보기 →" : "다음 단계 →"}
          </button>
        </div>
      )}
    </div>
  );
}
