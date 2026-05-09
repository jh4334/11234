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
    timerRef.current = setTimeout(() => { save('memo', val); setSaved(true); }, 1000);
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="widget memo-widget">
      <div className="widget-header">
        <span className="widget-title">📝 메모</span>
        <span className="memo-status">{saved ? '저장됨' : '저장 중...'}</span>
      </div>
      <textarea className="memo-textarea" placeholder="자유롭게 메모하세요..." value={text} onChange={handleChange} />
    </div>
  );
}
