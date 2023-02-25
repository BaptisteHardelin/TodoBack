const bcrypt = require("bcrypt");
const client = require("../database/database");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await client.query(`SELECT * FROM todo_user WHERE email=$1`, [
      email,
    ]);

    const user = data.rows;

    if (user.length === 0) {
      res.status(400).json({ error: "User is not register, signup first" });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Server error" });
        } else if (result) {
          const token = jwt.sign({ email }, process.env.SECRET_KEY);
          res.status(200).json({ message: "User logged !", token });
        } else {
          if (!result) {
            res.status(400).json({ error: "Enter incorrect password" });
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};
