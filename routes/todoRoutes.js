const express = require("express");
const routes = express.Router();
const { helloWorld } = require("../controller/todoController");

routes.get("/", helloWorld);

module.exports = routes;
