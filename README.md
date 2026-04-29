# hiring-fullstack-todo

A full-stack TODO application built with React, Express.js, and MongoDB.

## Project Structure

```
hiring-fullstack-todo/
├── client/        # React frontend (Vite)
│   └── README.md
├── server/        # Express.js backend
│   └── README.md
├── package.json   # Monorepo root
└── README.md
```

## Quick Start (Monorepo)

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas URI)

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Configure environment
```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI
```

### 3. Run both client and server concurrently
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Tech Stack

| Layer    | Technology               |
|----------|--------------------------|
| Frontend | React 18, Vite, Axios    |
| Backend  | Node.js, Express.js      |
| Database | MongoDB, Mongoose        |
| Monorepo | npm workspaces           |

## Features

- ✅ View all TODOs
- ✅ Create a TODO (title + optional description)
- ✅ Edit title and/or description
- ✅ Toggle done/undone
- ✅ Delete a TODO
- ✅ Optimistic UI updates
- ✅ Form validation
- ✅ Loading & error states
- ✅ Smooth animations & transitions
