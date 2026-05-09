import { useState } from 'react';
import { load, save } from '../../utils/storage';

export default function TodoList() {
  const [todos, setTodos] = useState(() => load('todos', []));
  const [input, setInput] = useState('');

  function update(next) { setTodos(next); save('todos', next); }
  function addTodo() {
    const t = input.trim();
    if (!t) return;
    update([...todos, { id: Date.now(), text: t, done: false }]);
    setInput('');
  }

  const done = todos.filter(t => t.done).length;

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">✅ 할 일 목록</span>
        {todos.length > 0 && <span className="todo-progress">{done}/{todos.length}</span>}
      </div>
      <div className="todo-input-row">
        <input className="todo-input" placeholder="할 일 추가..."
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button className="todo-add-btn" onClick={addTodo}>+</button>
      </div>
      <div className="todo-list">
        {todos.length === 0 && <p className="todo-empty">할 일을 추가해보세요 🎉</p>}
        {todos.map(t => (
          <div key={t.id} className={`todo-item${t.done ? ' todo-item--done' : ''}`}>
            <button className={`todo-check${t.done ? ' todo-check--done' : ''}`}
              onClick={() => update(todos.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}>
              {t.done ? '✓' : ''}
            </button>
            <span className="todo-text">{t.text}</span>
            <button className="todo-delete" onClick={() => update(todos.filter(x => x.id !== t.id))}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
