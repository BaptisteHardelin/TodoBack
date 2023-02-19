require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const port = process.env.PORT || 8000;

app
  .use(morgan("combined"))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use(todoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "page not found" });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
