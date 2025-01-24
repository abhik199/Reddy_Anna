const express = require("express");

const { Router } = require("express");

const user_router = Router();

user_router.post("/login", async (req, res) => {});

user_router.post("/register", async (req, res) => {});
module.exports = user_router;
