const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let todos = [];
let nextId = 1;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }

  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);
  return res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ error: "todo not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "title must be a non-empty string" });
    }
    todo.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "completed must be a boolean" });
    }
    todo.completed = completed;
  }

  return res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "todo not found" });
  }

  todos.splice(index, 1);
  return res.status(204).send();
});

app.delete("/todos", (req, res) => {
  todos = [];
  nextId = 1;
  return res.status(204).send();
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Todo backend running on port ${port}`);
});
