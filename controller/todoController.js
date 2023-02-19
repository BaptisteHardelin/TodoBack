require("dotenv").config();
const { Pool, Client } = require("pg");

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString,
});

const helloDB = (req, result) => {
  pool.query("SELECT * from todo", (err, res) => {
    result.json(res.rows);
  });
  pool.end();
};

const helloWorld = (req, res) => {
  res.json({ hello: "Hello World" });
};

module.exports = {
  helloWorld,
  helloDB,
};
