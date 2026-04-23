export const ranks = [
  { minPct: 0,  title: "견습 탐정",   emoji: "🔍", color: "#94a3b8", desc: "AI 윤리를 배우기 시작했어요! 더 연습해봐요." },
  { minPct: 25, title: "정식 탐정",   emoji: "🕵️", color: "#60a5fa", desc: "AI 윤리 감각이 생기고 있어요! 좋아요." },
  { minPct: 50, title: "베테랑 탐정", emoji: "⭐", color: "#f59e0b", desc: "AI 윤리 감각이 뛰어나요! 멋져요." },
  { minPct: 75, title: "엘리트 탐정", emoji: "🏅", color: "#a78bfa", desc: "AI 윤리 전문가에 가까워요! 대단해요." },
  { minPct: 90, title: "명탐정",      emoji: "🏆", color: "#f97316", desc: "완벽한 AI 윤리 수호자예요! 최고예요!" },
];

export function getRank(score, max) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  return [...ranks].reverse().find((r) => pct >= r.minPct) || ranks[0];
}
