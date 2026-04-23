import { useState } from "react";
import chatbotScenarios from "../data/chatbotScenarios";

export default function ChatbotGuardGame({ onComplete, onExit }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);

  const scenario = chatbotScenarios[idx];
  const progress = (idx / chatbotScenarios.length) * 100;
  const picked = selected !== null ? scenario.responses[selected] : null;

  const handlePick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setTotal((t) => t + scenario.responses[i].score);
  };

  const handleNext = () => {
    const newResults = [...results, { id: scenario.id, score: scenario.responses[selected].score }];
    if (idx < chatbotScenarios.length - 1) {
      setResults(newResults);
      setIdx(idx + 1);
      setSelected(null);
    } else {
      onComplete({ totalScore: total, results: newResults });
    }
  };

  return (
    <div className="game-page">
      <div className="hud">
        <button className="hud-exit" onClick={onExit}>← 나가기</button>
        <div className="hud-score">⭐ {total}점</div>
        <div className="hud-mission">{idx + 1} / {chatbotScenarios.length}</div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      <div className="chatbot-wrap">
        <div className="chatbot-header">
          <div className="chatbot-ava">🤖</div>
          <div>
            <div className="chatbot-name">안전 챗봇 역할극</div>
            <div className="chatbot-tag">사용자에게 가장 안전한 응답을 골라주세요</div>
          </div>
        </div>

        {/* 사용자 말풍선 */}
        <div className="chat-row user">
          <div className="chat-ava">👤</div>
          <div className="chat-bubble user-bubble">{scenario.user}</div>
        </div>

        {/* 응답 선택지 */}
        <div className="chat-prompt">챗봇의 응답으로 무엇을 고를까요?</div>
        <div className="chat-options">
          {scenario.responses.map((r, i) => {
            const state = selected === null ? "" :
                          selected === i ? `chosen score-${r.score === 2 ? "great" : r.score === 1 ? "ok" : "wrong"}` :
                          "dimmed";
            return (
              <button
                key={i}
                className={`chat-option ${state}`}
                onClick={() => handlePick(i)}
                disabled={selected !== null}
              >
                <span className="chat-option-ava">🤖</span>
                <span className="chat-option-text">{r.text}</span>
              </button>
            );
          })}
        </div>

        {picked && (
          <div className={`feedback-panel score-bg-${picked.score === 2 ? "great" : picked.score === 1 ? "ok" : "wrong"}`}>
            <div className="feedback-header">
              <span className={`feedback-label label-${picked.score === 2 ? "great" : picked.score === 1 ? "ok" : "wrong"}`}>
                {picked.score === 2 ? "훌륭해요!" : picked.score === 1 ? "괜찮아요" : "아쉬워요"}
              </span>
              <span className="feedback-pts">+{picked.score}점</span>
            </div>
            <p className="feedback-text">{picked.feedback}</p>
            <button className="btn-next" onClick={handleNext}>
              {idx < chatbotScenarios.length - 1 ? "다음 대화 →" : "결과 보기 🏆"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
