const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../conf/j.token");
require("dotenv").config();
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Add user info to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
