# TODO App — Backend

Express.js REST API with MongoDB via Mongoose.

## Setup

### 1. Install dependencies
```bash
cd server
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
```

**MongoDB Atlas** (cloud):
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
```

### 3. Run the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | /api/todos            | Get all TODOs         |
| POST   | /api/todos            | Create a new TODO     |
| PUT    | /api/todos/:id        | Update title/desc     |
| PATCH  | /api/todos/:id/done   | Toggle done status    |
| DELETE | /api/todos/:id        | Delete a TODO         |
| GET    | /api/health           | Health check          |

### Request / Response examples

**POST /api/todos**
```json
// Request body
{ "title": "Buy groceries", "description": "Milk, eggs, bread" }

// Response 201
{ "success": true, "data": { "_id": "...", "title": "Buy groceries", "description": "Milk, eggs, bread", "done": false, "createdAt": "...", "updatedAt": "..." } }
```

**PATCH /api/todos/:id/done**
```json
// Response 200 — toggles done field
{ "success": true, "data": { "done": true, ... } }
```

---

## Assumptions & Limitations

- MongoDB must be running before starting the server
- No authentication — all TODOs are shared (single user scope)
- IDs are MongoDB ObjectIds
- `title` is required; `description` is optional (defaults to empty string)
