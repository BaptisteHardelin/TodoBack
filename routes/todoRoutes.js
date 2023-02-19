const express = require("express");
const routes = express.Router();
const { helloWorld, helloDB } = require("../controller/todoController");

routes.get("/", helloWorld);
routes.get("/db", helloDB);

module.exports = routes;
