const express = require("express");
const routes = express.Router();
const {
  getAllTodos,
  createTodo,
  getOneTodo,
} = require("../controller/todoController");

routes.get("/getAllTodos", getAllTodos);
routes.get("/getOneTodo/:id", getOneTodo);
routes.post("/createTodo", createTodo);

module.exports = routes;
