import { games } from "../data/games";

export default function GameHub({ completed, onSelect, onFinish, onTeacher, onReset }) {
  const playable = games.filter((g) => g.playable);
  const totalScore = playable.reduce((s, g) => s + (completed[g.key]?.score || 0), 0);
  const maxTotal = playable.reduce((s, g) => s + g.maxScore, 0);
  const doneCount = playable.filter((g) => completed[g.key]).length;
  const allDone = doneCount === playable.length;

  return (
    <div className="hub-page">
      <div className="hub-header">
        <div>
          <h1 className="hub-title">🎮 Ethics Pick</h1>
          <p className="hub-sub">AI 윤리 미니게임 허브</p>
        </div>
        <button className="btn-teacher-link" onClick={onTeacher}>🔒 교사</button>
      </div>

      <div className="hub-progress">
        <div className="hub-progress-row">
          <span>완료 {doneCount} / {playable.length}</span>
          <span className="hub-score">⭐ {totalScore} / {maxTotal}점</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(doneCount / playable.length) * 100}%` }} />
        </div>
      </div>

      <div className="hub-grid">
        {games.map((g) => {
          const done = completed[g.key];
          const locked = !g.playable;
          return (
            <button
              key={g.id}
              className={`hub-card ${locked ? "locked" : done ? "done" : ""} diff-${g.difficulty}`}
              onClick={() => !locked && onSelect(g.key)}
              disabled={locked}
            >
              <div className="hub-card-top">
                <div className="hub-card-num">#{String(g.id).padStart(2, "0")}</div>
                <div className={`hub-card-diff diff-${g.difficulty}`}>
                  {g.difficulty === "easy" ? "쉬움" : g.difficulty === "medium" ? "중간" : "어려움"}
                </div>
              </div>
              <div className="hub-card-emoji">{g.emoji}</div>
              <div className="hub-card-title">{g.title}</div>
              <div className="hub-card-desc">{g.desc}</div>
              <div className="hub-card-foot">
                {locked ? (
                  <span className="hub-card-lock">🔒 준비 중</span>
                ) : done ? (
                  <span className="hub-card-score">✅ {done.score} / {g.maxScore}점</span>
                ) : (
                  <span className="hub-card-play">▶ 플레이</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {allDone && (
        <button className="btn-start" onClick={onFinish}>
          <span>최종 결과 보기</span><span className="btn-arrow">🏆</span>
        </button>
      )}

      {doneCount > 0 && (
        <button className="btn-restart" onClick={onReset}>🔄 진행 초기화</button>
      )}
    </div>
  );
}
