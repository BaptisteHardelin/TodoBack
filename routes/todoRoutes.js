const express = require("express");
const routes = express.Router();
const { getAllTodos, createTodo } = require("../controller/todoController");

routes.get("/getAllTodos", getAllTodos);
routes.post("/createTodo", createTodo);

module.exports = routes;
