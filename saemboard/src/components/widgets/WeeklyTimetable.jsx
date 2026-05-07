import { useState } from 'react';
import { load, save } from '../../utils/storage';

const DAYS = ['월', '화', '수', '목', '금'];
const PERIODS = [1, 2, 3, 4, 5, 6];

const SUBJECT_COLORS = [
  '#F4A97F', '#A8D4C2', '#B8AADE', '#F9CF7A',
  '#F49AA0', '#91C4E8', '#C5E1A5', '#FFCCBC',
];

function colorForSubject(name, colorMap) {
  if (!name) return null;
  if (!colorMap[name]) return null;
  return SUBJECT_COLORS[colorMap[name] % SUBJECT_COLORS.length];
}

export default function WeeklyTimetable() {
  const [grid, setGrid] = useState(() => load('timetable-grid', {}));
  const [colorMap, setColorMap] = useState(() => load('timetable-colors', {}));
  const [editing, setEditing] = useState(null); // { day, period }
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
      const usedCount = Object.keys(colorMap).length;
      const newColorMap = { ...colorMap, [val]: usedCount };
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
        <div className="tt-corner" />
        {DAYS.map(d => (
          <div key={d} className="tt-day-header">{d}</div>
        ))}

        {PERIODS.map(p => (
          <>
            <div key={`p-${p}`} className="tt-period-label">{p}교시</div>
            {DAYS.map(d => {
              const key = cellKey(d, p);
              const subject = grid[key] || '';
              const bg = colorForSubject(subject, colorMap);
              const isEditing = editing?.day === d && editing?.period === p;
              return (
                <div
                  key={key}
                  className={`tt-cell${subject ? ' tt-cell--filled' : ''}`}
                  style={bg ? { background: bg + '55', borderColor: bg } : {}}
                  onClick={() => !isEditing && startEdit(d, p)}
                >
                  {isEditing ? (
                    <input
                      className="tt-cell-input"
                      value={editValue}
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
          </>
        ))}
      </div>

      <style>{`
        .tt-grid {
          display: grid;
          grid-template-columns: 44px repeat(5, 1fr);
          gap: 3px;
          margin-top: 8px;
          font-size: 12px;
        }
        .tt-corner {}
        .tt-day-header {
          text-align: center;
          font-weight: 700;
          color: var(--text-muted);
          padding: 4px 0;
          font-size: 12px;
        }
        .tt-period-label {
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: var(--text-light); font-weight: 600;
        }
        .tt-cell {
          min-height: 38px;
          border: 1.5px solid var(--border-light);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s;
          padding: 2px;
        }
        .tt-cell:hover { border-color: var(--accent); }
        .tt-cell--filled { border-color: transparent; }
        .tt-cell-text {
          font-size: 11px; font-weight: 600; color: var(--text);
          text-align: center; word-break: keep-all;
        }
        .tt-cell-input {
          width: 100%; border: none; background: transparent;
          font-size: 11px; text-align: center; font-weight: 600;
          color: var(--text);
        }
      `}</style>
    </div>
  );
}
