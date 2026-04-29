import { useState } from 'react';
import EditModal from './EditModal.jsx';

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className={`todo-item${todo.done ? ' is-done' : ''}`} role="listitem">
        {/* Checkbox */}
        <button
          className="t-check"
          onClick={() => onToggle(todo._id)}
          aria-label={todo.done ? 'Mark as active' : 'Mark as done'}
        >
          <span className="t-check-icon">✓</span>
        </button>

        {/* Body */}
        <div className="t-body">
          <div className="t-title">{todo.title}</div>
          {todo.description && <div className="t-desc">{todo.description}</div>}
          <div className="t-meta">
            <span className="t-date">{fmt(todo.createdAt)}</span>
            {todo.done && <span className="t-done-pill">Done</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="t-actions">
          <button className="icon-btn" onClick={() => setEditing(true)} title="Edit" aria-label="Edit">✏</button>
          <button className="icon-btn danger" onClick={() => onDelete(todo._id)} title="Delete" aria-label="Delete">✕</button>
        </div>
      </div>

      {editing && (
        <EditModal todo={todo} onSave={onUpdate} onClose={() => setEditing(false)} />
      )}
    </>
  );
}