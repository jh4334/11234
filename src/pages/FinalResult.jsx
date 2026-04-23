import { useState } from "react";
import { games } from "../data/games";
import { getRank } from "../data/ranks";

export default function FinalResult({ completed, onRestart, onSavePledge, onHub }) {
  const [pledge, setPledge] = useState("");
  const [saved, setSaved] = useState(false);

  const playable = games.filter((g) => g.playable);
  const totalScore = playable.reduce((s, g) => s + (completed[g.key]?.score || 0), 0);
  const maxTotal = playable.reduce((s, g) => s + g.maxScore, 0);
  const rank = getRank(totalScore, maxTotal);
  const pct = Math.round((totalScore / maxTotal) * 100);

  const handleSave = () => {
    if (pledge.trim()) {
      setSaved(true);
      if (onSavePledge) onSavePledge(pledge.trim());
    }
  };

  return (
    <div className="result-page">
      <div className="rank-card" style={{ "--rank-color": rank.color }}>
        <div className="rank-badge-emoji">{rank.emoji}</div>
        <div className="rank-title">{rank.title}</div>
        <div className="rank-score">{totalScore} / {maxTotal}점 ({pct}%)</div>
        <div className="rank-bar-track">
          <div className="rank-bar-fill" style={{ width: `${pct}%`, background: rank.color }} />
        </div>
        <p className="rank-desc">{rank.desc}</p>
      </div>

      <div className="games-summary">
        <h3 className="summary-title">게임별 점수</h3>
        {playable.map((g) => {
          const c = completed[g.key];
          const gamePct = c ? Math.round((c.score / g.maxScore) * 100) : 0;
          return (
            <div key={g.key} className="summary-row">
              <span className="summary-emoji">{g.emoji}</span>
              <span className="summary-name">{g.title}</span>
              <div className="summary-bar-track">
                <div className="summary-bar-fill" style={{ width: `${gamePct}%` }} />
              </div>
              <span className="summary-score">{c?.score || 0}/{g.maxScore}</span>
            </div>
          );
        })}
      </div>

      <div className="pledge-box">
        <h3 className="pledge-title">✏️ 나의 AI 윤리 실천 약속</h3>
        {!saved ? (
          <>
            <textarea
              className="pledge-input"
              placeholder="예: 나는 AI를 사용할 때 항상 출처를 밝히겠습니다."
              value={pledge}
              onChange={(e) => setPledge(e.target.value)}
              rows={3}
              maxLength={200}
            />
            <button className="btn-pledge" onClick={handleSave} disabled={!pledge.trim()}>
              약속 저장 💾
            </button>
          </>
        ) : (
          <div className="pledge-saved">
            <p className="pledge-saved-text">"{pledge}"</p>
            <p className="pledge-saved-confirm">🎉 약속이 저장되었습니다!</p>
          </div>
        )}
      </div>

      <button className="btn-restart" onClick={onHub}>← 허브로 돌아가기</button>
      <button className="btn-restart" onClick={onRestart}>🔄 처음부터 다시 하기</button>
    </div>
  );
}
