import { useState } from 'react';
import { load, save } from '../../utils/storage';

export default function TodoList() {
  const [todos, setTodos] = useState(() => load('todos', []));
  const [input, setInput] = useState('');

  function updateAndSave(next) {
    setTodos(next);
    save('todos', next);
  }

  function addTodo() {
    const t = input.trim();
    if (!t) return;
    updateAndSave([...todos, { id: Date.now(), text: t, done: false }]);
    setInput('');
  }

  function toggle(id) {
    updateAndSave(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function remove(id) {
    updateAndSave(todos.filter(t => t.id !== id));
  }

  const done = todos.filter(t => t.done).length;

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">✅ 할 일 목록</span>
        {todos.length > 0 && (
          <span className="todo-progress">{done}/{todos.length}</span>
        )}
      </div>

      <div className="todo-input-row">
        <input
          className="todo-input"
          placeholder="할 일 추가..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button className="todo-add-btn" onClick={addTodo}>+</button>
      </div>

      <div className="todo-list">
        {todos.length === 0 && (
          <p className="todo-empty">할 일을 추가해보세요 🎉</p>
        )}
        {todos.map(t => (
          <div key={t.id} className={`todo-item${t.done ? ' todo-item--done' : ''}`}>
            <button
              className={`todo-check${t.done ? ' todo-check--done' : ''}`}
              onClick={() => toggle(t.id)}
            >
              {t.done ? '✓' : ''}
            </button>
            <span className="todo-text">{t.text}</span>
            <button className="todo-delete" onClick={() => remove(t.id)}>✕</button>
          </div>
        ))}
      </div>

      <style>{`
        .todo-progress {
          font-size: 12px; font-weight: 600;
          color: var(--accent); background: var(--accent-soft);
          padding: 2px 8px; border-radius: 20px;
        }
        .todo-input-row {
          display: flex; gap: 6px; margin-bottom: 10px;
        }
        .todo-input {
          flex: 1; padding: 7px 10px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--bg); font-size: 13px;
          transition: border-color 0.15s;
        }
        .todo-input:focus { border-color: var(--accent); }
        .todo-add-btn {
          width: 32px; height: 32px;
          background: var(--accent); color: #fff;
          border-radius: var(--radius-sm); font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .todo-add-btn:hover { background: var(--accent-hover); }

        .todo-list { display: flex; flex-direction: column; gap: 4px; }
        .todo-empty { font-size: 12px; color: var(--text-muted); text-align: center; padding: 12px 0; }

        .todo-item {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 8px; border-radius: var(--radius-sm);
          transition: background 0.1s;
        }
        .todo-item:hover { background: var(--bg); }
        .todo-item--done .todo-text { text-decoration: line-through; color: var(--text-muted); }

        .todo-check {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid var(--border);
          flex-shrink: 0; font-size: 11px; color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, border-color 0.15s;
        }
        .todo-check--done { background: var(--accent); border-color: var(--accent); }
        .todo-check:hover:not(.todo-check--done) { border-color: var(--accent); }

        .todo-text { flex: 1; font-size: 13px; color: var(--text); }
        .todo-delete { color: var(--text-light); font-size: 11px; opacity: 0; transition: opacity 0.15s; }
        .todo-item:hover .todo-delete { opacity: 1; }
        .todo-delete:hover { color: #E07A3A; }
      `}</style>
    </div>
  );
}
