require("dotenv").config();
const { Pool } = require("pg");

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString,
});

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * from todo");

    res.json(allTodos.rows).status(201);
  } catch (error) {
    console.log(error.message);
  }
};

const getOneTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const getTodoById = await pool.query("select * from todo where id=$1", [
      id,
    ]);

    if (getTodoById.rows.length === 0) {
      res.status(404).json({ error: "page not found" });
    }

    res.json(getTodoById.rows).status(200);
  } catch (error) {
    console.log(error.message);
  }
};

const createTodo = async (req, res) => {
  try {
    let { title, content, status } = req.body;
    if (status === null || status === "") {
      console.log("here");
      status = "todo";
    }
    const newTodo = await pool.query(
      "INSERT INTO todo(title, content, status) VALUES($1, $2, $3) RETURNING *",
      [title, content, status]
    );

    res.json(newTodo.rows[0]).status(201);
  } catch (error) {
    console.log(error.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, status } = req.body;

    const todoToUpdate = await pool.query(
      "UPDATE todo SET title=$1, content=$2, status=$3 WHERE id=$4",
      [title, content, status, id]
    );

    res.json({ updated: "todo update" }).status(200);
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const todoStatusUpdate = await pool.query(
      "UPDATE todo SET status=$1 WHERE id=$2",
      [status, id]
    );

    res.json({ updated: "status todo update" }).status(200);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOneTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todoToDelete = await pool.query("delete from todo where id=$1", [id]);

    res.json({ deleted: "todo deleted", todoToDelete }).status(200);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getOneTodo,
  updateTodo,
  deleteOneTodo,
  updateStatus,
};
