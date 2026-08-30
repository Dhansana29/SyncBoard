# SyncBoard – Full-Stack Project

A complete Kanban-style team task board based on the supplied group project brief.

## Included
- React reusable UI components
- Node.js + Express REST API
- MongoDB + Mongoose
- JWT register/login + protected routes
- Task CRUD and To Do / Doing / Done workflow
- localStorage draft persistence
- conflict detection with a task version number
- Socket.io real-time refresh
- Jest + Supertest server tests
- Jest + React Testing Library client tests
- GitHub Actions CI
- Docker Compose
- Wireframe, component tree, schema, bug record, reflection template

## Run locally

### Server
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Client
```bash
cd client
npm install
npm start
```

Client: http://localhost:3000  
API: http://localhost:5000

## Docker
```bash
docker compose up --build
```

## API
| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/tasks | Read tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update/move task |
| DELETE | /api/tasks/:id | Delete task |

## Conflict handling
Each task has a `version`. The client sends the version it last saw. If the server already has a newer version, it responds with HTTP 409 instead of overwriting the newer data.

## Real-time
Socket.io broadcasts `task:created`, `task:updated`, and `task:deleted`. Connected clients reload automatically.

## Final submission
Add your real group member names, GitHub URL, deployed URL, screenshots, and one-page reflection before submitting.
