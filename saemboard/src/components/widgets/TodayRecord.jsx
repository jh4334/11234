import { useState, useEffect, useRef } from 'react';
import { load, save } from '../../utils/storage';
import { todayYMD } from '../../utils/dateUtils';

export default function TodayRecord() {
  const today = todayYMD();
  const [records, setRecords] = useState(() => load('records', {}));
  const [text, setText] = useState(() => (load('records', {}))[today] || '');
  const [saved, setSaved] = useState(true);
  const timerRef = useRef(null);

  function handleChange(e) {
    const val = e.target.value;
    setText(val);
    setSaved(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const updated = { ...records, [today]: val };
      setRecords(updated);
      save('records', updated);
      setSaved(true);
    }, 1000);
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const now = new Date();
  const weekDots = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    return { label: WEEK_DAYS[i], key, hasRecord: !!(records[key]) };
  });

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">📖 오늘 기록</span>
        <span className="memo-status">{saved ? '' : '저장 중...'}</span>
      </div>
      <div className="record-week-dots">
        {weekDots.map(({ label, key, hasRecord }) => (
          <div key={key} className={`record-dot-col${key === today ? ' record-dot-col--today' : ''}`}>
            <div className={`record-dot${hasRecord ? ' record-dot--filled' : ''}`} />
            <span className="record-dot-label">{label}</span>
          </div>
        ))}
      </div>
      <textarea className="memo-textarea" placeholder={`${today} 오늘 하루를 기록해보세요...`}
        value={text} onChange={handleChange} style={{ minHeight: '90px' }} />
    </div>
  );
}
