require("dotenv").config();
const { Pool, Client } = require("pg");

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString,
});

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * from todo");
    return res.json(allTodos.rows).status(201);
  } catch (error) {
    return console.log(error.message);
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(title, content) VALUES($1, $2) RETURNING *",
      [title, content]
    );
    return res.json(newTodo.rows[0]).status(201);
  } catch (error) {
    return console.log(error.message);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
};
