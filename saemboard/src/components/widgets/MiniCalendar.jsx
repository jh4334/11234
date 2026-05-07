import { useState } from 'react';
import { load, save } from '../../utils/storage';
import { getMonthLabel, getDaysInMonth, getFirstDayOfMonth, toYMD, todayYMD } from '../../utils/dateUtils';

const EVENT_COLORS = [
  { id: 'orange', label: '주황', color: '#E07A3A' },
  { id: 'blue', label: '파랑', color: '#91C4E8' },
  { id: 'green', label: '초록', color: '#A8D4C2' },
  { id: 'purple', label: '보라', color: '#B8AADE' },
  { id: 'red', label: '빨강', color: '#F49AA0' },
];

export default function MiniCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState(() => load('events', {}));
  const [modal, setModal] = useState(null); // { date, mode: 'view'|'add' }
  const [form, setForm] = useState({ title: '', color: 'orange' });

  const todayStr = todayYMD();
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  function openDay(dateStr) {
    setModal({ date: dateStr, mode: 'view' });
    setForm({ title: '', color: 'orange' });
  }

  function addEvent() {
    if (!form.title.trim()) return;
    const updated = {
      ...events,
      [modal.date]: [...(events[modal.date] || []), {
        id: Date.now(),
        title: form.title.trim(),
        color: form.color,
      }],
    };
    setEvents(updated);
    save('events', updated);
    setForm({ title: '', color: 'orange' });
    setModal(m => ({ ...m, mode: 'view' }));
  }

  function deleteEvent(date, id) {
    const updated = {
      ...events,
      [date]: (events[date] || []).filter(e => e.id !== id),
    };
    setEvents(updated);
    save('events', updated);
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const m = String(month + 1).padStart(2, '0');
    const day = String(d).padStart(2, '0');
    cells.push(`${year}-${m}-${day}`);
  }

  const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const dayEventsInModal = modal ? (events[modal.date] || []) : [];

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">📅 미니 캘린더</span>
        <div className="cal-nav">
          <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
          <span className="cal-month-label">{getMonthLabel(year, month)}</span>
          <button className="cal-nav-btn" onClick={nextMonth}>›</button>
        </div>
      </div>

      <div className="cal-grid">
        {WEEK_DAYS.map((d, i) => (
          <div key={d} className={`cal-weekday${i === 0 ? ' cal-weekday--sun' : i === 6 ? ' cal-weekday--sat' : ''}`}>
            {d}
          </div>
        ))}
        {cells.map((dateStr, idx) => {
          if (!dateStr) return <div key={`empty-${idx}`} />;
          const d = parseInt(dateStr.split('-')[2]);
          const dayOfWeek = (idx) % 7;
          const isToday = dateStr === todayStr;
          const hasEvents = (events[dateStr] || []).length > 0;
          const dotColors = (events[dateStr] || []).slice(0, 3).map(e => {
            const c = EVENT_COLORS.find(ec => ec.id === e.color);
            return c ? c.color : '#E07A3A';
          });

          return (
            <button
              key={dateStr}
              className={`cal-day${isToday ? ' cal-day--today' : ''}${dayOfWeek === 0 ? ' cal-day--sun' : dayOfWeek === 6 ? ' cal-day--sat' : ''}`}
              onClick={() => openDay(dateStr)}
            >
              <span className="cal-day-num">{d}</span>
              {hasEvents && (
                <div className="cal-day-dots">
                  {dotColors.map((color, i) => (
                    <span key={i} className="cal-dot" style={{ background: color }} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {modal && (
        <div className="cal-modal-backdrop" onClick={() => setModal(null)}>
          <div className="cal-modal" onClick={e => e.stopPropagation()}>
            <div className="cal-modal-header">
              <span className="cal-modal-date">{modal.date}</span>
              <button className="cal-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>

            <div className="cal-modal-events">
              {dayEventsInModal.length === 0 && (
                <p className="cal-no-events">일정이 없습니다</p>
              )}
              {dayEventsInModal.map(ev => {
                const c = EVENT_COLORS.find(ec => ec.id === ev.color);
                return (
                  <div key={ev.id} className="cal-event-item">
                    <span className="cal-event-dot" style={{ background: c?.color || '#E07A3A' }} />
                    <span className="cal-event-title">{ev.title}</span>
                    <button className="cal-event-delete" onClick={() => deleteEvent(modal.date, ev.id)}>✕</button>
                  </div>
                );
              })}
            </div>

            {modal.mode === 'view' ? (
              <button className="cal-add-btn" onClick={() => setModal(m => ({ ...m, mode: 'add' }))}>
                + 일정 추가
              </button>
            ) : (
              <div className="cal-add-form">
                <input
                  className="cal-add-input"
                  placeholder="일정 제목"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addEvent()}
                  autoFocus
                />
                <div className="cal-color-picker">
                  {EVENT_COLORS.map(ec => (
                    <button
                      key={ec.id}
                      className={`cal-color-btn${form.color === ec.id ? ' cal-color-btn--active' : ''}`}
                      style={{ background: ec.color }}
                      onClick={() => setForm(f => ({ ...f, color: ec.id }))}
                      title={ec.label}
                    />
                  ))}
                </div>
                <div className="cal-add-actions">
                  <button className="btn-secondary" onClick={() => setModal(m => ({ ...m, mode: 'view' }))}>취소</button>
                  <button className="btn-primary" onClick={addEvent}>추가</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cal-nav { display: flex; align-items: center; gap: 6px; }
        .cal-nav-btn {
          width: 26px; height: 26px; border-radius: 50%;
          background: var(--accent-soft); color: var(--accent);
          font-size: 16px; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .cal-nav-btn:hover { background: var(--accent-light); }
        .cal-month-label { font-size: 13px; font-weight: 600; color: var(--text); min-width: 80px; text-align: center; }

        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
          margin-top: 8px;
        }
        .cal-weekday {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          padding: 4px 0;
        }
        .cal-weekday--sun { color: #E07A3A; }
        .cal-weekday--sat { color: #91C4E8; }

        .cal-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px 2px;
          border-radius: 6px;
          min-height: 36px;
          transition: background 0.12s;
          gap: 2px;
        }
        .cal-day:hover { background: var(--accent-soft); }
        .cal-day--today .cal-day-num {
          background: var(--accent);
          color: #fff;
          border-radius: 50%;
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
        }
        .cal-day--sun .cal-day-num { color: #E07A3A; }
        .cal-day--sat .cal-day-num { color: #91C4E8; }
        .cal-day-num { font-size: 12px; font-weight: 500; line-height: 1; }
        .cal-day-dots { display: flex; gap: 2px; flex-wrap: wrap; justify-content: center; }
        .cal-dot { width: 5px; height: 5px; border-radius: 50%; display: block; }

        .cal-modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(61, 43, 31, 0.25);
          display: flex; align-items: center; justify-content: center;
          z-index: 200;
        }
        .cal-modal {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 20px;
          width: 300px;
          box-shadow: var(--shadow-md);
        }
        .cal-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px;
        }
        .cal-modal-date { font-size: 14px; font-weight: 700; color: var(--text); }
        .cal-modal-close {
          color: var(--text-muted); font-size: 14px;
          padding: 4px; border-radius: 50%;
        }
        .cal-modal-close:hover { background: var(--border-light); }

        .cal-modal-events { display: flex; flex-direction: column; gap: 6px; min-height: 40px; }
        .cal-no-events { font-size: 13px; color: var(--text-muted); }
        .cal-event-item {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 8px;
          background: var(--bg);
          border-radius: var(--radius-sm);
        }
        .cal-event-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cal-event-title { flex: 1; font-size: 13px; }
        .cal-event-delete { color: var(--text-light); font-size: 11px; }
        .cal-event-delete:hover { color: #E07A3A; }

        .cal-add-btn {
          margin-top: 12px; width: 100%;
          padding: 8px; border-radius: var(--radius-sm);
          background: var(--accent-soft); color: var(--accent);
          font-size: 13px; font-weight: 600;
          transition: background 0.15s;
        }
        .cal-add-btn:hover { background: var(--accent-light); }

        .cal-add-form { margin-top: 12px; display: flex; flex-direction: column; gap: 10px; }
        .cal-add-input {
          padding: 8px 12px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 13px;
          background: var(--bg);
        }
        .cal-add-input:focus { border-color: var(--accent); }

        .cal-color-picker { display: flex; gap: 8px; }
        .cal-color-btn {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid transparent;
          transition: transform 0.1s;
        }
        .cal-color-btn--active { border-color: var(--text); transform: scale(1.2); }

        .cal-add-actions { display: flex; gap: 8px; justify-content: flex-end; }
        .btn-primary {
          padding: 6px 16px; background: var(--accent); color: #fff;
          border-radius: var(--radius-sm); font-size: 13px; font-weight: 600;
          transition: background 0.15s;
        }
        .btn-primary:hover { background: var(--accent-hover); }
        .btn-secondary {
          padding: 6px 16px; background: var(--bg); color: var(--text-muted);
          border-radius: var(--radius-sm); font-size: 13px;
          border: 1.5px solid var(--border);
        }
        .btn-secondary:hover { background: var(--border-light); }
      `}</style>
    </div>
  );
}
