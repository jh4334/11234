import { useState } from 'react';
import { load, save } from '../utils/storage';

const EVENT_COLORS = [
  { id: 'orange', label: '주황', color: '#E07A3A' },
  { id: 'blue', label: '파랑', color: '#91C4E8' },
  { id: 'green', label: '초록', color: '#A8D4C2' },
  { id: 'purple', label: '보라', color: '#B8AADE' },
  { id: 'red', label: '빨강', color: '#F49AA0' },
];

export default function SchedulePage() {
  const [events, setEvents] = useState(() => {
    const stored = load('events', {});
    const list = [];
    Object.entries(stored).forEach(([date, evts]) => evts.forEach(e => list.push({ ...e, date })));
    return list.sort((a, b) => a.date.localeCompare(b.date));
  });
  const [form, setForm] = useState({ date: '', title: '', color: 'orange' });
  const [showForm, setShowForm] = useState(false);

  function addEvent() {
    if (!form.date || !form.title.trim()) return;
    const stored = load('events', {});
    const newEvt = { id: Date.now(), title: form.title.trim(), color: form.color };
    const updated = { ...stored, [form.date]: [...(stored[form.date] || []), newEvt] };
    save('events', updated);
    const list = [];
    Object.entries(updated).forEach(([date, evts]) => evts.forEach(e => list.push({ ...e, date })));
    setEvents(list.sort((a, b) => a.date.localeCompare(b.date)));
    setForm({ date: '', title: '', color: 'orange' });
    setShowForm(false);
  }

  function deleteEvent(date, id) {
    const stored = load('events', {});
    const updated = { ...stored, [date]: (stored[date] || []).filter(e => e.id !== id) };
    save('events', updated);
    setEvents(prev => prev.filter(e => !(e.date === date && e.id === id)));
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">📅 일정 관리</h1>
        <button className="btn-primary" onClick={() => setShowForm(s => !s)}>+ 일정 추가</button>
      </div>

      {showForm && (
        <div className="widget schedule-form">
          <div className="form-row">
            <label className="form-label">날짜</label>
            <input type="date" className="form-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="form-row">
            <label className="form-label">제목</label>
            <input className="form-input" placeholder="일정 제목" value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addEvent()} />
          </div>
          <div className="form-row">
            <label className="form-label">색상</label>
            <div className="cal-color-picker">
              {EVENT_COLORS.map(ec => (
                <button key={ec.id}
                  className={`cal-color-btn${form.color === ec.id ? ' cal-color-btn--active' : ''}`}
                  style={{ background: ec.color }} onClick={() => setForm(f => ({ ...f, color: ec.id }))} title={ec.label} />
              ))}
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-secondary" onClick={() => setShowForm(false)}>취소</button>
            <button className="btn-primary" onClick={addEvent}>저장</button>
          </div>
        </div>
      )}

      <div className="schedule-list">
        {events.length === 0 && <div className="empty-state">일정이 없습니다. 일정을 추가해보세요! 📆</div>}
        {events.map(ev => {
          const c = EVENT_COLORS.find(ec => ec.id === ev.color);
          return (
            <div key={`${ev.date}-${ev.id}`} className="schedule-item">
              <div className="schedule-item-dot" style={{ background: c?.color || '#E07A3A' }} />
              <div className="schedule-item-info">
                <span className="schedule-item-date">{ev.date}</span>
                <span className="schedule-item-title">{ev.title}</span>
              </div>
              <button className="todo-delete schedule-delete" onClick={() => deleteEvent(ev.date, ev.id)}>✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
