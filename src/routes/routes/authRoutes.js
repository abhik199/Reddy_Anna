const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authController");
const { verifyToken } = require("../../middleware/authMiddleware");
const { registerUser, loginUser } = require("../../controllers/authController");
const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route Example
router.get("/profile", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route.", user: req.user });
});

module.exports = router;
