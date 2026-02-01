import { useState } from "react";

const TEACHER_PASSWORD = "ethics2025";

export default function TeacherLogin({ onAuth, onBack }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === TEACHER_PASSWORD) {
      onAuth();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="page start-page">
      <div className="card">
        <h2 className="teacher-title">교사 모드 로그인</h2>
        <p className="teacher-desc">
          교사 전용 페이지입니다.<br />
          비밀번호를 입력해 주세요.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="name-input"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoFocus
          />
          {error && <p className="error-text">비밀번호가 틀렸습니다.</p>}
          <button className="btn btn-primary" type="submit" disabled={!password}>
            로그인
          </button>
        </form>
        <button className="btn btn-secondary" onClick={onBack}>
          돌아가기
        </button>
      </div>
    </div>
  );
}
