const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/database");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await pool.query(`SELECT * FROM todo_user WHERE email= $1`, [
      email,
    ]);

    const arr = data.rows;

    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      brcypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(err).json({
            error: "Server error",
          });
        }

        const user = {
          email,
          password: hash,
        };
        let flag = 1;

        pool.query(
          `INSERT INTO todo_user (email, password) VALUES ($1, $2)`,
          [user.email, user.password],
          (err) => {
            if (err) {
              flag = 0; //If user is not inserted is not inserted to database
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              flag = 1;
              res
                .status(200)
                .send({ message: "User added to database, not verified" });
            }
          }
        );

        if (flag) {
          const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
};
