import { useState, useEffect, useMemo } from "react";
import termPairs from "../data/termPairs";

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck() {
  const cards = [];
  termPairs.forEach((p) => {
    cards.push({ key: `${p.id}-term`, pairId: p.id, kind: "term", label: p.term, emoji: p.emoji });
    cards.push({ key: `${p.id}-desc`, pairId: p.id, kind: "desc", label: p.desc, emoji: p.emoji });
  });
  return shuffle(cards);
}

export default function TermMatchGame({ onComplete, onExit }) {
  const [deck] = useState(buildDeck);
  const [flipped, setFlipped] = useState([]);       // 현재 뒤집힌 카드 키들 (최대 2)
  const [matched, setMatched] = useState(new Set()); // 맞춘 pairId 모음
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [startTime] = useState(Date.now());

  const totalPairs = termPairs.length;
  const isDone = matched.size === totalPairs;

  useEffect(() => {
    if (flipped.length === 2) {
      setLocked(true);
      const [a, b] = flipped.map((k) => deck.find((c) => c.key === k));
      if (a.pairId === b.pairId && a.kind !== b.kind) {
        // Match!
        setTimeout(() => {
          setMatched((prev) => new Set([...prev, a.pairId]));
          setFlipped([]);
          setLocked(false);
        }, 600);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped, deck]);

  useEffect(() => {
    if (isDone) {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      // Scoring: base 12, penalty per extra move, bonus for speed
      const perfectMoves = totalPairs; // 6
      const movePenalty = Math.max(0, moves - perfectMoves);
      const speedBonus = seconds < 60 ? 2 : seconds < 120 ? 1 : 0;
      const rawScore = 10 - movePenalty + speedBonus;
      const score = Math.max(0, Math.min(12, rawScore));
      setTimeout(() => onComplete({ totalScore: score, moves, seconds }), 700);
    }
  }, [isDone, moves, startTime, onComplete, totalPairs]);

  const handleFlip = (card) => {
    if (locked) return;
    if (matched.has(card.pairId)) return;
    if (flipped.includes(card.key)) return;
    if (flipped.length >= 2) return;
    setFlipped((prev) => [...prev, card.key]);
  };

  const isFlipped = (card) => flipped.includes(card.key) || matched.has(card.pairId);

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>← 나가기</button>
        <div className="hud-score">🧩 {matched.size} / {totalPairs}</div>
        <div className="hud-mission">{moves}턴</div>
      </div>

      <div className="match-header">
        <h2 className="match-title">🧩 Term Match</h2>
        <p className="match-sub">AI 윤리 용어와 설명을 짝지어 주세요</p>
      </div>

      <div className="match-grid">
        {deck.map((card) => {
          const flip = isFlipped(card);
          const done = matched.has(card.pairId);
          return (
            <button
              key={card.key}
              className={`match-card ${flip ? "flipped" : ""} ${done ? "done" : ""} ${card.kind === "term" ? "is-term" : "is-desc"}`}
              onClick={() => handleFlip(card)}
              disabled={locked}
            >
              <div className="match-inner">
                <div className="match-front">
                  <span className="match-q">?</span>
                </div>
                <div className="match-back">
                  {card.kind === "term" ? (
                    <>
                      <div className="match-emoji">{card.emoji}</div>
                      <div className="match-term">{card.label}</div>
                    </>
                  ) : (
                    <div className="match-desc">{card.label}</div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
