import { useState } from "react";
import { loadAllResults, clearAllResults } from "../App";
import { calculateScores, maxScores, categoryLabels } from "../data/scoring";
import missions from "../data/missions";

function exportToCSV(results) {
  const headers = [
    "이름",
    "참여일시",
    "프라이버시 보호",
    "공정성 인식",
    "투명성 실천",
    "책임감",
    "총점",
    ...missions.map((m) => `미션${m.id}: ${m.title}`),
    "사전-개인정보관심",
    "사전-공정성인식",
    "사전-책임감",
    "사후-개인정보관심",
    "사후-공정성인식",
    "사후-책임감",
    "실천 약속",
  ];

  const totalMax = Object.values(maxScores).reduce((a, b) => a + b, 0);

  const rows = results.map((r) => {
    const scores = calculateScores(r.missionResults || []);
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const date = r.timestamp
      ? new Date(r.timestamp).toLocaleString("ko-KR")
      : "";

    const missionScores = missions.map((_, idx) => {
      const mr = (r.missionResults || [])[idx];
      return mr ? mr.score : "";
    });

    const preSurvey = r.preSurvey || {};
    const postSurvey = r.postSurvey || {};

    return [
      r.name,
      date,
      scores.Privacy,
      scores.Fairness,
      scores.Transparency,
      scores.Responsibility,
      `${total}/${totalMax}`,
      ...missionScores,
      preSurvey.pre1 || "",
      preSurvey.pre2 || "",
      preSurvey.pre3 || "",
      postSurvey.post1 || "",
      postSurvey.post2 || "",
      postSurvey.post3 || "",
      r.pledge || "",
    ];
  });

  const BOM = "\uFEFF";
  const csvContent =
    BOM +
    [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ethics-pick-results-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function TeacherDashboard({ onBack }) {
  const [results, setResults] = useState(loadAllResults());
  const totalMax = Object.values(maxScores).reduce((a, b) => a + b, 0);

  const handleClear = () => {
    if (window.confirm("모든 학생 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) {
      clearAllResults();
      setResults([]);
    }
  };

  // 전체 평균 계산
  const avgScores = { Privacy: 0, Fairness: 0, Transparency: 0, Responsibility: 0 };
  if (results.length > 0) {
    results.forEach((r) => {
      const s = calculateScores(r.missionResults || []);
      for (const key of Object.keys(avgScores)) {
        avgScores[key] += s[key];
      }
    });
    for (const key of Object.keys(avgScores)) {
      avgScores[key] = (avgScores[key] / results.length).toFixed(1);
    }
  }

  return (
    <div className="page teacher-page">
      <div className="card teacher-card">
        <h2 className="teacher-title">교사 대시보드</h2>
        <p className="teacher-summary">총 참여 학생: <strong>{results.length}명</strong></p>

        {results.length > 0 && (
          <>
            {/* 전체 평균 */}
            <div className="avg-section">
              <h3>전체 평균 점수</h3>
              <div className="avg-grid">
                {Object.entries(avgScores).map(([key, avg]) => (
                  <div key={key} className="avg-item">
                    <div className="avg-label">{categoryLabels[key]}</div>
                    <div className="avg-value">{avg} / {maxScores[key]}</div>
                    <div className="avg-bar-track">
                      <div
                        className="avg-bar-fill"
                        style={{
                          width: `${(avg / maxScores[key]) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 학생 목록 테이블 */}
            <div className="table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>프라이버시</th>
                    <th>공정성</th>
                    <th>투명성</th>
                    <th>책임감</th>
                    <th>총점</th>
                    <th>약속</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, idx) => {
                    const scores = calculateScores(r.missionResults || []);
                    const total = Object.values(scores).reduce((a, b) => a + b, 0);
                    return (
                      <tr key={idx}>
                        <td>{r.name}</td>
                        <td>{scores.Privacy}/{maxScores.Privacy}</td>
                        <td>{scores.Fairness}/{maxScores.Fairness}</td>
                        <td>{scores.Transparency}/{maxScores.Transparency}</td>
                        <td>{scores.Responsibility}/{maxScores.Responsibility}</td>
                        <td className="total-cell">{total}/{totalMax}</td>
                        <td className="pledge-cell">{r.pledge || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 액션 버튼 */}
            <button className="btn btn-primary" onClick={() => exportToCSV(results)}>
              엑셀(CSV) 다운로드
            </button>
            <button className="btn btn-danger" onClick={handleClear}>
              전체 데이터 삭제
            </button>
          </>
        )}

        {results.length === 0 && (
          <div className="empty-state">
            <p>아직 참여한 학생이 없습니다.</p>
            <p className="empty-hint">학생들이 활동을 완료하면 여기에 결과가 표시됩니다.</p>
          </div>
        )}

        <button className="btn btn-secondary" onClick={onBack}>
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}
