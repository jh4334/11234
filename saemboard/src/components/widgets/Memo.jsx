import { useState, useEffect, useRef } from 'react';
import { load, save } from '../../utils/storage';

export default function Memo() {
  const [text, setText] = useState(() => load('memo', ''));
  const [saved, setSaved] = useState(true);
  const timerRef = useRef(null);

  function handleChange(e) {
    const val = e.target.value;
    setText(val);
    setSaved(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      save('memo', val);
      setSaved(true);
    }, 1000);
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="widget memo-widget">
      <div className="widget-header">
        <span className="widget-title">📝 메모</span>
        <span className="memo-status">{saved ? '저장됨' : '저장 중...'}</span>
      </div>

      <textarea
        className="memo-textarea"
        placeholder="자유롭게 메모하세요..."
        value={text}
        onChange={handleChange}
      />

      <style>{`
        .memo-widget { display: flex; flex-direction: column; }
        .memo-status { font-size: 11px; color: var(--text-light); }
        .memo-textarea {
          flex: 1; resize: none;
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          background: var(--bg);
          font-size: 13px; line-height: 1.6;
          color: var(--text);
          min-height: 120px;
          transition: border-color 0.15s;
        }
        .memo-textarea:focus { border-color: var(--accent); }
        .memo-textarea::placeholder { color: var(--text-light); }
      `}</style>
    </div>
  );
}
