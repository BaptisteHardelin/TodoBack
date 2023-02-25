require("dotenv").config();
const pool = require("../database/database");

const findByEmail = async (email) => {
  const result = await pool.query("SELECT id FROM todo_user WHERE email = $1", [
    email,
  ]);

  return result.rows[0].id;
};

const getAllTodos = async (req, res) => {
  try {
    const currentUser = req.userData.email;
    const allTodos = await pool.query(
      "SELECT t.* from todo AS t JOIN todo_user AS u ON t.user_id = u.id WHERE u.email= $1",
      [currentUser]
    );

    res.json(allTodos.rows).status(201);
  } catch (error) {
    console.log(error.message);
  }
};

const getOneTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const getTodoById = await pool.query(
      "SELECT t.*, u.email AS user_email FROM todo t JOIN todo_user u ON t.user_id = u.id WHERE t.id = $1",
      [id]
    );

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
    const findUser = await pool.query(
      "SELECT id FROM todo_user WHERE email = $1",
      [req.userData.email]
    );

    const currentUser = findUser.rows[0].id;

    let { title, content, status } = req.body;
    if (status === null || status === "") {
      status = "todo";
    }

    const newTodo = await pool.query(
      "INSERT INTO todo(title, content, status, user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [title, content, status, currentUser]
    );

    res.json(newTodo.rows[0]).status(201);
  } catch (error) {
    console.log(error.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const findUser = await pool.query(
      "SELECT id FROM todo_user WHERE email = $1",
      [req.userData.email]
    );
    const currentUser = findUser.rows[0].id;

    const id = req.params.id;
    const { title, content, status } = req.body;

    const todoToUpdate = await pool.query(
      "UPDATE todo SET title=$1, content=$2, status=$3, user_id=$4 WHERE id=$5",
      [title, content, status, currentUser, id]
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

    const findUser = await pool.query(
      "SELECT id FROM todo_user WHERE email = $1",
      [req.userData.email]
    );
    const currentUser = findUser.rows[0].id;

    const todoStatusUpdate = await pool.query(
      "UPDATE todo SET status=$1 WHERE id=$2 and user_id=$3",
      [status, id, currentUser]
    );

    res.json({ updated: "status todo update" }).status(200);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOneTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await pool.query(
      "SELECT id FROM todo_user WHERE email = $1",
      [req.userData.email]
    );
    const currentUser = findUser.rows[0].id;

    const todoToDelete = await pool.query(
      "delete from todo where id=$1 and user_id=$2",
      [id, currentUser]
    );

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
