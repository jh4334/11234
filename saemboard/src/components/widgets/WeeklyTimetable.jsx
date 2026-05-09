import { useState } from 'react';
import { load, save } from '../../utils/storage';

const DAYS = ['월', '화', '수', '목', '금'];
const PERIODS = [1, 2, 3, 4, 5, 6];
const SUBJECT_COLORS = ['#F4A97F','#A8D4C2','#B8AADE','#F9CF7A','#F49AA0','#91C4E8','#C5E1A5','#FFCCBC'];

export default function WeeklyTimetable() {
  const [grid, setGrid] = useState(() => load('timetable-grid', {}));
  const [colorMap, setColorMap] = useState(() => load('timetable-colors', {}));
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  function cellKey(day, period) { return `${day}-${period}`; }

  function startEdit(day, period) {
    setEditing({ day, period });
    setEditValue(grid[cellKey(day, period)] || '');
  }

  function commitEdit() {
    if (!editing) return;
    const key = cellKey(editing.day, editing.period);
    const val = editValue.trim();
    const newGrid = { ...grid, [key]: val };
    setGrid(newGrid);
    save('timetable-grid', newGrid);
    if (val && colorMap[val] === undefined) {
      const newColorMap = { ...colorMap, [val]: Object.keys(colorMap).length };
      setColorMap(newColorMap);
      save('timetable-colors', newColorMap);
    }
    setEditing(null);
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">📋 주간 시간표</span>
      </div>
      <div className="tt-grid">
        <div />
        {DAYS.map(d => <div key={d} className="tt-day-header">{d}</div>)}
        {PERIODS.map(p => (
          <div key={p} style={{ display: 'contents' }}>
            <div className="tt-period-label">{p}교시</div>
            {DAYS.map(d => {
              const key = cellKey(d, p);
              const subject = grid[key] || '';
              const colorIdx = colorMap[subject];
              const bg = subject && colorIdx !== undefined ? SUBJECT_COLORS[colorIdx % SUBJECT_COLORS.length] : null;
              const isEditing = editing?.day === d && editing?.period === p;
              return (
                <div
                  key={key}
                  className={`tt-cell${subject ? ' tt-cell--filled' : ''}`}
                  style={bg ? { background: bg + '55', borderColor: bg } : {}}
                  onClick={() => !isEditing && startEdit(d, p)}
                >
                  {isEditing ? (
                    <input className="tt-cell-input" value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditing(null); }}
                      autoFocus
                    />
                  ) : (
                    <span className="tt-cell-text">{subject}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
