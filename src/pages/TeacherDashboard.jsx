import { useState } from "react";
import { games } from "../data/games";
import { getRank } from "../data/ranks";

const RESULTS_KEY = "ethics-pick-results";
const playableGames = games.filter((g) => g.playable);
const MAX_TOTAL = playableGames.reduce((s, g) => s + g.maxScore, 0);

function loadResults() {
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]"); }
  catch { return []; }
}

function totalOf(entry) {
  return playableGames.reduce((s, g) => s + (entry.completed?.[g.key]?.score || 0), 0);
}

function exportCSV(rows) {
  const headers = [
    "시간", "총점", `만점(${MAX_TOTAL})`, "등급",
    ...playableGames.map((g) => `${g.title}(${g.maxScore})`),
    "약속",
  ];
  const lines = rows.map((r) => {
    const total = totalOf(r);
    const rank = getRank(total, MAX_TOTAL);
    return [
      new Date(r.timestamp).toLocaleString("ko-KR"),
      total, MAX_TOTAL, rank.title,
      ...playableGames.map((g) => r.completed?.[g.key]?.score ?? ""),
      r.pledge || "",
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
  });
  const bom = "﻿";
  const blob = new Blob([bom + [headers.join(","), ...lines].join("\n")],
                       { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ethics-pick-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function TeacherDashboard({ onBack }) {
  const [rows, setRows] = useState(loadResults);

  const avg = rows.length > 0
    ? (rows.reduce((s, r) => s + totalOf(r), 0) / rows.length).toFixed(1)
    : "-";

  const handleClear = () => {
    if (window.confirm("모든 데이터를 삭제할까요? 되돌릴 수 없습니다.")) {
      localStorage.removeItem(RESULTS_KEY);
      setRows([]);
    }
  };

  return (
    <div className="teacher-page">
      <div className="teacher-header">
        <button className="btn-back" onClick={onBack}>← 허브로</button>
        <h2>📊 교사 대시보드</h2>
        <div className="teacher-summary">
          참여 {rows.length}명 · 평균 {avg}/{MAX_TOTAL}점
        </div>
      </div>

      {rows.length > 0 ? (
        <>
          <div className="teacher-actions">
            <button className="btn-csv" onClick={() => exportCSV(rows)}>
              📥 CSV 다운로드
            </button>
            <button className="btn-clear" onClick={handleClear}>
              🗑️ 데이터 삭제
            </button>
          </div>
          <div className="table-wrap">
            <table className="student-table">
              <thead>
                <tr>
                  <th>시간</th>
                  <th>총점</th>
                  <th>등급</th>
                  {playableGames.map((g) => (
                    <th key={g.key}>{g.emoji} {g.title}</th>
                  ))}
                  <th>약속</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const total = totalOf(r);
                  const rank = getRank(total, MAX_TOTAL);
                  return (
                    <tr key={i}>
                      <td>{new Date(r.timestamp).toLocaleString("ko-KR")}</td>
                      <td className="td-score">{total}/{MAX_TOTAL}</td>
                      <td>{rank.emoji} {rank.title}</td>
                      {playableGames.map((g) => {
                        const s = r.completed?.[g.key]?.score;
                        return (
                          <td key={g.key} className="td-m">
                            {s !== undefined ? `${s}/${g.maxScore}` : "-"}
                          </td>
                        );
                      })}
                      <td className="td-pledge">{r.pledge || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="teacher-empty">
          <p>📭 아직 참여한 학생이 없어요.</p>
          <p>학생들이 게임을 완료하면 여기에 결과가 쌓여요.</p>
        </div>
      )}
    </div>
  );
}
