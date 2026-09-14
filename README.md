# SyncBoard – Assignment 03

SyncBoard is a collaborative Kanban-style task board.

## Stack
- React
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Socket.io
- LocalStorage
- Postman
- GitHub Actions
- Docker Compose starter

## Backend

```powershell
cd server
npm install
Copy-Item .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Run:

```powershell
npm start
```

## Frontend

Open another terminal:

```powershell
cd client
npm install
npm run dev
```

Open `http://localhost:5173`

## API

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## MongoDB Atlas

Database:
`syncboard`

Collections:
`users`
`tasks`

## Postman

Import:
`postman/SyncBoard_API.postman_collection.json`

## Assignment 03 Tag

```powershell
git tag -a assignment-03-fullstack -m "Assignment 03 - Working Full stack application"
git push origin assignment-03-fullstack
```

Do not commit `.env` or secrets.
