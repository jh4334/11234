import { useState } from "react";

export default function StartPage({ onNext }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onNext(name.trim());
  };

  return (
    <div className="page start-page">
      <div className="card">
        <h1 className="app-title">Ethics Pick</h1>
        <p className="app-subtitle">AI 윤리 선택 시뮬레이터</p>
        <p className="app-desc">
          AI와 함께 살아가는 세상에서<br />
          올바른 선택을 연습해 봐요!
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="name-input"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            autoFocus
          />
          <button className="btn btn-primary" type="submit" disabled={!name.trim()}>
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
