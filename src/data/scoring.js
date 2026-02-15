// 미션별 역량 매핑 및 점수 계산
// Mission 1,5 → Privacy (max 4)
// Mission 2,6 → Fairness (max 4)
// Mission 3 → Transparency (max 2)
// Mission 4 → Responsibility (max 2)

const categoryMap = {
  Privacy: [0, 4],       // mission index 0, 4
  Fairness: [1, 5],      // mission index 1, 5
  Transparency: [2],     // mission index 2
  Responsibility: [3],   // mission index 3
};

const maxScores = {
  Privacy: 4,
  Fairness: 4,
  Transparency: 2,
  Responsibility: 2,
};

const categoryLabels = {
  Privacy: "프라이버시 보호",
  Fairness: "공정성 인식",
  Transparency: "투명성 실천",
  Responsibility: "책임감",
};

export function calculateScores(missionResults) {
  const scores = {};
  for (const [category, indices] of Object.entries(categoryMap)) {
    scores[category] = indices.reduce((sum, idx) => {
      return sum + (missionResults[idx]?.score || 0);
    }, 0);
  }
  return scores;
}

export { maxScores, categoryLabels };
