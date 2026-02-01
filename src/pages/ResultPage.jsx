import { useState } from "react";
import ScoreBar from "../components/ScoreBar";
import { calculateScores, maxScores, categoryLabels } from "../data/scoring";

export default function ResultPage({ name, missionResults, onSavePledge }) {
  const [pledge, setPledge] = useState("");
  const [saved, setSaved] = useState(false);
  const scores = calculateScores(missionResults);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const totalMax = Object.values(maxScores).reduce((a, b) => a + b, 0);

  const handleSave = () => {
    if (pledge.trim()) {
      onSavePledge(pledge.trim());
      setSaved(true);
    }
  };

  return (
    <div className="page result-page">
      <div className="card">
        <h2>{name}님의 AI 윤리 역량 결과</h2>
        <div className="total-score">
          총점: {totalScore} / {totalMax}
        </div>

        <div className="score-bars">
          {Object.entries(scores).map(([key, score]) => (
            <ScoreBar
              key={key}
              label={categoryLabels[key]}
              score={score}
              max={maxScores[key]}
            />
          ))}
        </div>

        <div className="pledge-section">
          <h3>나의 AI 윤리 실천 약속</h3>
          {!saved ? (
            <>
              <textarea
                className="pledge-input"
                placeholder="예: 나는 AI를 사용할 때 항상 출처를 밝히겠습니다."
                value={pledge}
                onChange={(e) => setPledge(e.target.value)}
                maxLength={200}
                rows={3}
              />
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!pledge.trim()}
              >
                약속 저장하기
              </button>
            </>
          ) : (
            <div className="pledge-saved">
              <p className="pledge-display">"{pledge}"</p>
              <p className="pledge-confirm">약속이 저장되었습니다!</p>
            </div>
          )}
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => window.location.reload()}
        >
          처음부터 다시 하기
        </button>
      </div>
    </div>
  );
}
