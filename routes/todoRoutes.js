const express = require("express");
const routes = express.Router();
const {
  getAllTodos,
  createTodo,
  getOneTodo,
  updateTodo,
  deleteOneTodo,
  updateStatus,
} = require("../controller/todoController");

routes.get("/getAllTodos", getAllTodos);
routes.get("/getOneTodo/:id", getOneTodo);
routes.patch("/updateTodo/:id", updateTodo);
routes.patch("/updateStatusTodo/:id", updateStatus);
routes.delete("/deleteTodo/:id", deleteOneTodo);
routes.post("/createTodo", createTodo);

module.exports = routes;
