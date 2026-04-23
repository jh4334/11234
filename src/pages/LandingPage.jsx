export default function LandingPage({ onStart, onTeacher }) {
  return (
    <div className="landing">
      <div className="landing-bg" />
      <div className="landing-content">
        <div className="landing-badge">AI 윤리 교육 게임</div>
        <h1 className="landing-title">
          <span className="title-em">Ethics</span> Pick
        </h1>
        <p className="landing-sub">AI 탐정이 되어 윤리적 선택을 완수하라!</p>

        <div className="landing-stats">
          <div className="stat-item"><span className="stat-num">10</span><span className="stat-label">미션</span></div>
          <div className="stat-divider" />
          <div className="stat-item"><span className="stat-num">4</span><span className="stat-label">역량</span></div>
          <div className="stat-divider" />
          <div className="stat-item"><span className="stat-num">5</span><span className="stat-label">등급</span></div>
        </div>

        <button className="btn-start" onClick={onStart}>
          <span>게임 시작</span>
          <span className="btn-arrow">→</span>
        </button>

        <button className="btn-teacher-link" onClick={onTeacher}>
          🔒 교사 모드
        </button>
      </div>
    </div>
  );
}
