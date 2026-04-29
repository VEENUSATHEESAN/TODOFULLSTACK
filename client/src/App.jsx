import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos.js';
import AddTodoForm from './components/AddTodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';
import ToastContainer from './components/ToastContainer.jsx';

const FILTERS = [
  { key: 'All',    icon: '◈', label: 'All Tasks' },
  { key: 'Active', icon: '◇', label: 'Active' },
  { key: 'Done',   icon: '◆', label: 'Completed' },
];

function todayStr() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

export default function App() {
  const {
    todos, loading, error, toasts,
    createTodo, toggleDone, updateTodo, deleteTodo,
  } = useTodos();

  const [filter, setFilter] = useState('All');
  const [errDismissed, setErrDismissed] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'Active') return todos.filter((t) => !t.done);
    if (filter === 'Done')   return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const doneCount   = todos.filter((t) => t.done).length;
  const activeCount = todos.filter((t) => !t.done).length;
  const pct = todos.length ? Math.round((doneCount / todos.length) * 100) : 0;

  const counts = { All: todos.length, Active: activeCount, Done: doneCount };

  const EMPTY = {
    All:    { icon: '📋', title: 'No tasks yet', text: 'Add your first task above to get started.' },
    Active: { icon: '✨', title: 'All caught up!', text: "Every task is done — great work!" },
    Done:   { icon: '🎉', title: 'Nothing completed', text: 'Finish a task and it will appear here.' },
  };

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        {/* Brand */}
        <div className="brand">
          <div className="brand-logo">✓</div>
          <span className="brand-name">TODO</span>
        </div>

        {/* Stats */}
        {!loading && (
          <>
            <div>
              <div className="sb-label" style={{ marginBottom: 10 }}>Overview</div>
              <div className="stats-grid">
                <div className="stat-chip c-text">
                  <div className="stat-num">{todos.length}</div>
                  <div className="stat-lbl">Total</div>
                </div>
                <div className="stat-chip c-cyan">
                  <div className="stat-num">{activeCount}</div>
                  <div className="stat-lbl">Active</div>
                </div>
                <div className="stat-chip c-violet">
                  <div className="stat-num">{doneCount}</div>
                  <div className="stat-lbl">Done</div>
                </div>
                <div className="stat-chip c-amber">
                  <div className="stat-num">{pct}%</div>
                  <div className="stat-lbl">Progress</div>
                </div>
              </div>
            </div>

            <div className="progress-wrap">
              <div className="progress-header">
                <span className="progress-title">Completion</span>
                <span className="progress-pct">{pct}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </>
        )}

        {/* Filters */}
        <div>
          <div className="sb-label" style={{ marginBottom: 8 }}>Filter</div>
          <div className="sb-nav">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`sb-nav-item${filter === f.key ? ' active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                <span className="sb-nav-left">
                  <span className="sb-nav-icon">{f.icon}</span>
                  {f.label}
                </span>
                <span className="sb-nav-badge">{counts[f.key]}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">
        {/* Heading */}
        <div className="page-heading">
          <div className="page-heading-row">
            <h1 className="page-title">My Tasks</h1>
            <span className="page-date">{todayStr()}</span>
          </div>
          <p className="page-sub">
            {activeCount > 0
              ? `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`
              : todos.length > 0
              ? '🎉 All tasks complete!'
              : 'Start by adding a task below.'}
          </p>
        </div>

        {/* Error */}
        {error && !errDismissed && (
          <div className="error-banner" role="alert">
            <div className="error-icon">⚠</div>
            <span>{error}</span>
            <button
              className="error-dismiss"
              onClick={() => setErrDismissed(true)}
              aria-label="Dismiss"
            >×</button>
          </div>
        )}

        {/* Add Form */}
        <AddTodoForm onAdd={createTodo} />

        {/* List header */}
        <div className="list-header">
          <span className="list-heading">
            {filter === 'All' ? 'All Tasks' : filter === 'Active' ? 'Active Tasks' : 'Completed'}
          </span>
          <span className="list-count">{filtered.length}</span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-wrap">
            <div className="spinner" />
            <span className="loading-txt">Loading tasks…</span>
          </div>
        )}

        {/* List */}
        {!loading && (
          <div className="todo-list" role="list">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-box">{EMPTY[filter].icon}</div>
                <div className="empty-title">{EMPTY[filter].title}</div>
                <div className="empty-text">{EMPTY[filter].text}</div>
              </div>
            ) : (
              <>
                {/* In "All" view: active first, then divider, then done */}
                {filter === 'All' ? (
                  <>
                    {filtered.filter(t => !t.done).map((todo) => (
                      <TodoItem key={todo._id} todo={todo}
                        onToggle={toggleDone} onUpdate={updateTodo} onDelete={deleteTodo} />
                    ))}
                    {filtered.some(t => t.done) && filtered.some(t => !t.done) && (
                      <div className="sect-divider">
                        <div className="divider-line" />
                        <span className="divider-txt">Completed</span>
                        <div className="divider-line" />
                      </div>
                    )}
                    {filtered.filter(t => t.done).map((todo) => (
                      <TodoItem key={todo._id} todo={todo}
                        onToggle={toggleDone} onUpdate={updateTodo} onDelete={deleteTodo} />
                    ))}
                  </>
                ) : (
                  filtered.map((todo) => (
                    <TodoItem key={todo._id} todo={todo}
                      onToggle={toggleDone} onUpdate={updateTodo} onDelete={deleteTodo} />
                  ))
                )}
              </>
            )}
          </div>
        )}
      </main>

      <ToastContainer toasts={toasts} />
    </div>
  );
}