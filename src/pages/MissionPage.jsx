import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import missions from "../data/missions";

export default function MissionPage({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);

  const mission = missions[currentIdx];

  const handleChoice = (choiceIdx) => {
    if (selected !== null) return;
    setSelected(choiceIdx);
  };

  const handleNext = () => {
    const choice = mission.choices[selected];
    const newResults = [...results, { missionId: mission.id, choiceIdx: selected, score: choice.score }];
    setResults(newResults);

    if (currentIdx < missions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      onComplete(newResults);
    }
  };

  const choice = selected !== null ? mission.choices[selected] : null;

  return (
    <div className="page mission-page">
      <ProgressBar current={currentIdx + 1} total={missions.length} />
      <div className="card">
        <div className="mission-badge">{mission.category}</div>
        <h2 className="mission-title">미션 {currentIdx + 1}: {mission.title}</h2>
        <p className="mission-scenario">{mission.scenario}</p>

        <div className="choices">
          {mission.choices.map((c, idx) => (
            <button
              key={idx}
              className={`choice-btn ${
                selected === idx ? "chosen" : selected !== null ? "dimmed" : ""
              }`}
              onClick={() => handleChoice(idx)}
            >
              {c.text}
            </button>
          ))}
        </div>

        {choice && (
          <div className={`feedback feedback-score-${choice.score}`}>
            <div className="feedback-score">
              +{choice.score}점
            </div>
            <p className="feedback-text">{choice.feedback}</p>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentIdx < missions.length - 1 ? "다음 미션" : "결과 보기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
