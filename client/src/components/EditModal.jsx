import { useState, useEffect, useRef } from 'react';

export default function EditModal({ todo, onSave, onClose }) {
  const [title, setTitle]     = useState(todo.title);
  const [desc, setDesc]       = useState(todo.description || '');
  const [titleErr, setTitleErr] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSave = async () => {
    if (!title.trim()) { setTitleErr('Title is required'); return; }
    setLoading(true);
    try {
      await onSave(todo._id, { title: title.trim(), description: desc.trim() });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-bg"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-box">
        <div className="modal-head">
          <div>
            <div className="modal-title">Edit Task</div>
            <div className="modal-sub">Update the title or description</div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="modal-fields">
          <div>
            <label className="field-label">
              Title <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              ref={ref}
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setTitleErr(''); }}
              className={titleErr ? 'err' : ''}
              maxLength={200}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
            />
            {titleErr && <p className="field-err"><span>⚠</span> {titleErr}</p>}
          </div>
          <div>
            <label className="field-label">
              Description <span style={{ color: 'var(--text-3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>optional</span>
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Add more details…"
            />
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}