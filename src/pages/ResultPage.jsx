import { useState } from "react";
import { getRank } from "../data/ranks";
import missions from "../data/missions";

const MAX_SCORE = missions.length * 2;

const categoryScores = (results) => {
  const map = { 프라이버시: 0, 공정성: 0, 투명성: 0, 책임감: 0 };
  const count = { 프라이버시: 0, 공정성: 0, 투명성: 0, 책임감: 0 };
  results.forEach((r, i) => {
    const cat = missions[i].category;
    if (map[cat] !== undefined) {
      map[cat] += r.score;
      count[cat]++;
    }
  });
  return Object.entries(map).map(([cat, score]) => ({
    cat,
    score,
    max: count[cat] * 2,
    pct: count[cat] > 0 ? Math.round((score / (count[cat] * 2)) * 100) : 0,
  }));
};

const catEmoji = { 프라이버시: "🔐", 공정성: "⚖️", 투명성: "💡", 책임감: "🛡️" };

export default function ResultPage({ totalScore, results, onRestart, onSavePledge }) {
  const [pledge, setPledge] = useState("");
  const [saved, setSaved] = useState(false);
  const rank = getRank(totalScore);
  const cats = categoryScores(results);
  const pct = Math.round((totalScore / MAX_SCORE) * 100);

  const handleSave = () => {
    if (pledge.trim()) {
      setSaved(true);
      if (onSavePledge) onSavePledge(pledge.trim());
    }
  };

  return (
    <div className="result-page">
      {/* 랭크 카드 */}
      <div className="rank-card" style={{ "--rank-color": rank.color }}>
        <div className="rank-badge-emoji">{rank.emoji}</div>
        <div className="rank-title">{rank.title}</div>
        <div className="rank-score">{totalScore} / {MAX_SCORE}점</div>
        <div className="rank-bar-track">
          <div className="rank-bar-fill" style={{ width: `${pct}%`, background: rank.color }} />
        </div>
        <p className="rank-desc">{rank.desc}</p>
      </div>

      {/* 역량별 */}
      <div className="cat-grid">
        {cats.map(({ cat, score, max, pct }) => (
          <div key={cat} className="cat-card">
            <div className="cat-emoji">{catEmoji[cat]}</div>
            <div className="cat-name">{cat}</div>
            <div className="cat-bar-track">
              <div className="cat-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="cat-score">{score}/{max}</div>
          </div>
        ))}
      </div>

      {/* 실천 약속 */}
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

      <button className="btn-restart" onClick={onRestart}>
        🔄 다시 도전하기
      </button>
    </div>
  );
}
