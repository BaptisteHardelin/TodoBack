require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 8000;

app
  .use(morgan("combined"))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use(todoRoutes);
app.use("/user", userRoutes);

app.listen(port, () => console.log(`http://localhost:${port}`));
