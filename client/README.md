# TODO App — Frontend

React 18 + Vite frontend for the TODO application.

## Setup

### 1. Install dependencies
```bash
cd client
npm install
```

### 2. Run in development
```bash
npm run dev
```

App runs at: `http://localhost:5173`

> The Vite dev server proxies `/api` requests to `http://localhost:5000`, so the backend must be running too.

### 3. Build for production
```bash
npm run build
```

---

## Features

- **View TODOs** — All todos displayed, sorted newest first
- **Create TODO** — Title (required) + description (optional), Ctrl+Enter to submit
- **Edit TODO** — Click ✏ to open edit modal; Escape to close, Enter to save
- **Toggle Done** — Click the checkbox to mark done/undone (strikethrough style)
- **Delete TODO** — Click ✕ to remove
- **Filter** — All / Active / Done tabs
- **Optimistic UI** — Changes appear instantly, rolled back on error
- **Form validation** — Client-side title validation with error messages
- **Toast notifications** — Success/error feedback
- **Loading state** — Spinner while fetching
- **Error state** — Banner if backend is unreachable

---

## Assumptions & Limitations

- The backend must be running on port `5000` for the API proxy to work
- No authentication — all TODOs are visible to all users
- No pagination — all TODOs are loaded at once (suitable for small datasets)
- Descriptions are plain text only (no markdown rendering)
