const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const { date } = req.body;
    const { status } = req.body;
    const { remarks } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO adraquebernabe_todo.todos (description, date, status, remarks) VALUES($1, $2, $3, $4);",
      [description,date,status,remarks]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM adraquebernabe_todo.todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM adraquebernabe_todo.todos WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const { date } = req.body;
    const { status } = req.body;
    const { remarks } = req.body;
    const updateTodo = await pool.query(
      "UPDATE adraquebernabe_todo.todos SET description = $1, date = $3, status = $4, remarks = $5 WHERE todo_id = $2",
      [description, id, date, status, remarks]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM adraquebernabe_todo.todos WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
