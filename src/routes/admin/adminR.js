const express = require("express");

const { Router } = require("express");

const admin_router = Router();

// Define a route for the homepage

admin_router.get("/", (req, res) => {
  res.render("login");
});

module.exports = admin_router;
