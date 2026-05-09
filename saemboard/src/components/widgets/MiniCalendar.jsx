import { useState } from 'react';
import { load, save } from '../../utils/storage';
import { getMonthLabel, getDaysInMonth, getFirstDayOfMonth, todayYMD } from '../../utils/dateUtils';

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
  const [modal, setModal] = useState(null);
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
      [modal.date]: [...(events[modal.date] || []), { id: Date.now(), title: form.title.trim(), color: form.color }],
    };
    setEvents(updated);
    save('events', updated);
    setForm({ title: '', color: 'orange' });
    setModal(m => ({ ...m, mode: 'view' }));
  }

  function deleteEvent(date, id) {
    const updated = { ...events, [date]: (events[date] || []).filter(e => e.id !== id) };
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
          <div key={d} className={`cal-weekday${i === 0 ? ' cal-weekday--sun' : i === 6 ? ' cal-weekday--sat' : ''}`}>{d}</div>
        ))}
        {cells.map((dateStr, idx) => {
          if (!dateStr) return <div key={`e-${idx}`} />;
          const d = parseInt(dateStr.split('-')[2]);
          const dayOfWeek = idx % 7;
          const isToday = dateStr === todayStr;
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
              {dotColors.length > 0 && (
                <div className="cal-day-dots">
                  {dotColors.map((color, i) => <span key={i} className="cal-dot" style={{ background: color }} />)}
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
              {dayEventsInModal.length === 0 && <p className="cal-no-events">일정이 없습니다</p>}
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
              <button className="cal-add-btn" onClick={() => setModal(m => ({ ...m, mode: 'add' }))}>+ 일정 추가</button>
            ) : (
              <div className="cal-add-form">
                <input
                  className="cal-add-input" placeholder="일정 제목"
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addEvent()} autoFocus
                />
                <div className="cal-color-picker">
                  {EVENT_COLORS.map(ec => (
                    <button key={ec.id}
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
    </div>
  );
}
