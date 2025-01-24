const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from a .env file

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.w3b2b.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(url, {})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection failed:", err));
