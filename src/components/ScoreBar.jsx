export default function ScoreBar({ label, score, max }) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="score-bar-row">
      <span className="score-bar-label">{label}</span>
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="score-bar-value">
        {score} / {max}
      </span>
    </div>
  );
}
