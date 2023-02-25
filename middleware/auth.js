const jwt = require("jsonwebtoken");
const { getToken } = require("../controller/login");

const authMiddleware = (req, res, next) => {
  const token = getToken();

  if (token == null) {
    return res
      .status(401)
      .json({ message: "Authorization failed. Token missing." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    console.log("decoded token", decodedToken);
    req.userData = { email: decodedToken.email, decodedToken };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authorization failed. Invalid token." });
  }
};

module.exports = authMiddleware;
