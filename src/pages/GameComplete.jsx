export default function GameComplete({ game, score, onNext }) {
  const pct = Math.round((score / game.maxScore) * 100);
  const tier = pct >= 90 ? "perfect" : pct >= 70 ? "great" : pct >= 40 ? "ok" : "wrong";
  const tierLabel = pct >= 90 ? "완벽해요!" : pct >= 70 ? "잘했어요!" : pct >= 40 ? "괜찮아요" : "더 연습해봐요";
  const tierEmoji = pct >= 90 ? "🏆" : pct >= 70 ? "⭐" : pct >= 40 ? "👍" : "💪";

  return (
    <div className="complete-page">
      <div className={`complete-card complete-${tier}`}>
        <div className="complete-emoji">{tierEmoji}</div>
        <div className="complete-tier-label">{tierLabel}</div>
        <div className="complete-game-title">{game.emoji} {game.title} 완료!</div>
        <div className="complete-score">
          <span className="complete-score-num">{score}</span>
          <span className="complete-score-max"> / {game.maxScore}점</span>
        </div>
        <div className="complete-bar-track">
          <div className="complete-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <button className="btn-start" onClick={onNext}>
          <span>게임 허브로</span><span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
