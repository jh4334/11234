import { useState } from "react";

const PASSWORD = "ethics2025";

export default function TeacherLogin({ onAuth, onBack }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      onAuth();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="landing">
      <div className="landing-bg" />
      <div className="landing-content">
        <h2 className="teacher-login-title">🔒 교사 모드</h2>
        <p className="teacher-login-desc">교사 전용 페이지입니다. 비밀번호를 입력하세요.</p>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            className="game-input"
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            autoFocus
          />
          {error && <p className="error-msg">비밀번호가 틀렸습니다.</p>}
          <button className="btn-start" type="submit" disabled={!pw}>
            <span>로그인</span><span className="btn-arrow">→</span>
          </button>
        </form>
        <button className="btn-teacher-link" onClick={onBack}>← 돌아가기</button>
      </div>
    </div>
  );
}
