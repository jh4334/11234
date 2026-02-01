import { useState } from "react";
import { surveyOptions } from "../data/surveys";

export default function SurveyPage({ title, questions, onNext }) {
  const [answers, setAnswers] = useState({});

  const handleSelect = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="page survey-page">
      <div className="card">
        <h2>{title}</h2>
        <p className="survey-instruction">각 문항에 대해 자신의 생각을 선택하세요.</p>
        {questions.map((q, idx) => (
          <div key={q.id} className="survey-question">
            <p className="question-text">
              {idx + 1}. {q.text}
            </p>
            <div className="likert-group">
              {surveyOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`likert-btn ${answers[q.id] === opt.value ? "selected" : ""}`}
                  onClick={() => handleSelect(q.id, opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary"
          disabled={!allAnswered}
          onClick={() => onNext(answers)}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
