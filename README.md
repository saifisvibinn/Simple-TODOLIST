# Simple Todo Backend

Minimal Node.js + Express backend with in-memory todo storage.

## Run

```bash
npm install
npm start
```

Server runs on `http://localhost:3000` by default.

## API

- `GET /health` - health check
- `GET /todos` - list todos
- `POST /todos` - create todo
- `PUT /todos/:id` - update title/completed
- `DELETE /todos/:id` - delete one todo
- `DELETE /todos` - delete all todos

### Create todo example

```json
{
  "title": "Buy milk"
}
```

### Update todo example

```json
{
  "title": "Buy milk and eggs",
  "completed": true
}
```
