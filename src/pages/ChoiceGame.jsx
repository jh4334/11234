import { useState } from "react";
import missions from "../data/missions";

const SCORE_COLORS = { 0: "wrong", 1: "ok", 2: "great" };
const SCORE_LABELS = { 0: "아쉬워요", 1: "괜찮아요!", 2: "훌륭해요!" };

export default function ChoiceGame({ onComplete, onExit }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const mission = missions[idx];
  const progress = ((idx) / missions.length) * 100;

  const handleChoice = (choiceIdx) => {
    if (selected !== null) return;
    const choice = mission.choices[choiceIdx];
    setSelected(choiceIdx);
    setShowFeedback(true);
    setTotalScore((s) => s + choice.score);
  };

  const handleNext = () => {
    const choice = mission.choices[selected];
    const newResults = [...results, { missionId: mission.id, choiceIdx: selected, score: choice.score }];

    if (idx < missions.length - 1) {
      setResults(newResults);
      setIdx(idx + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      onComplete({ results: newResults, totalScore: totalScore + mission.choices[selected].score });
    }
  };

  const choice = selected !== null ? mission.choices[selected] : null;

  return (
    <div className="game-page">
      {/* HUD */}
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>← 나가기</button>
        <div className="hud-score">⭐ {totalScore}점</div>
        <div className="hud-mission">{idx + 1} / {missions.length}</div>
      </div>

      {/* 진행 바 */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      {/* 미션 카드 */}
      <div className="mission-card">
        <div className="mission-number">MISSION {String(idx + 1).padStart(2, "0")}</div>
        <h2 className="mission-title">{mission.title}</h2>
        <p className="mission-scenario">{mission.scenario}</p>

        {/* 선택지 */}
        <div className="choices">
          {mission.choices.map((c, i) => (
            <button
              key={i}
              className={`choice-btn
                ${selected === i ? `chosen score-${SCORE_COLORS[c.score]}` : ""}
                ${selected !== null && selected !== i ? "dimmed" : ""}
              `}
              onClick={() => handleChoice(i)}
              disabled={selected !== null}
            >
              <span className="choice-text">{c.text}</span>
              {selected === i && (
                <span className="choice-badge">{c.emoji}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 피드백 패널 */}
      {showFeedback && choice && (
        <div className={`feedback-panel score-bg-${SCORE_COLORS[choice.score]}`}>
          <div className="feedback-header">
            <span className="feedback-emoji">{choice.emoji}</span>
            <span className={`feedback-label label-${SCORE_COLORS[choice.score]}`}>
              {SCORE_LABELS[choice.score]}
            </span>
            <span className="feedback-pts">+{choice.score}점</span>
          </div>
          <p className="feedback-text">{choice.feedback}</p>
          <button className="btn-next" onClick={handleNext}>
            {idx < missions.length - 1 ? "다음 미션 →" : "결과 보기 🏆"}
          </button>
        </div>
      )}
    </div>
  );
}
