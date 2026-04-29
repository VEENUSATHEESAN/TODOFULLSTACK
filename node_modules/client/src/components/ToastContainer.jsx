const ICONS = { success: '✓', error: '✕' };

export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div className="toast-icon">{ICONS[t.type] ?? 'ℹ'}</div>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}