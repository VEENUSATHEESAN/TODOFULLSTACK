import { useState } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle]       = useState('');
  const [desc, setDesc]         = useState('');
  const [titleErr, setTitleErr] = useState('');
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    if (!title.trim()) { setTitleErr('Task title is required'); return false; }
    if (title.trim().length > 200) { setTitleErr('Must be under 200 characters'); return false; }
    setTitleErr('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onAdd({ title: title.trim(), description: desc.trim() });
      setTitle('');
      setDesc('');
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
  };

  return (
    <div className="add-card">
      <span className="form-label">New Task</span>

      <div className="form-row-main">
        <div className="input-wrap">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (titleErr) setTitleErr(''); }}
            onKeyDown={onKey}
            className={titleErr ? 'err' : ''}
            maxLength={200}
            aria-label="Task title"
          />
          {title.length > 160 && (
            <span className="char-hint">{title.length}/200</span>
          )}
        </div>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? '…' : '+ Add'}
        </button>
      </div>

      {titleErr && (
        <p className="field-err"><span>⚠</span> {titleErr}</p>
      )}

      <textarea
        placeholder="Description (optional) · Ctrl+Enter to submit"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyDown={onKey}
        rows={2}
        maxLength={1000}
        style={{ marginTop: 10 }}
        aria-label="Task description"
      />
    </div>
  );
}