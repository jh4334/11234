import WeeklyTimetable from '../components/widgets/WeeklyTimetable';

export default function TimetablePage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">📋 시간표 관리</h1>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
        셀을 클릭하여 과목명을 입력하세요. 같은 과목은 같은 색으로 표시됩니다.
      </p>
      <WeeklyTimetable />
      <style>{`
        .page { display: flex; flex-direction: column; gap: 16px; }
        .page-header { display: flex; align-items: center; justify-content: space-between; }
        .page-title { font-size: 20px; font-weight: 700; color: var(--text); }
      `}</style>
    </div>
  );
}
