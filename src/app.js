const express = require("express");
const path = require("path");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("../conf/database");

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set the views directory (optional, defaults to './views')
app.set("views", path.join(__dirname, "../src/views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Define a route

// admin routes
app.use("/", require("./routes/admin/adminR"));
app.use("/api/auth", require("./routes/routes/authRoutes"));

// app.get("/", (req, res) => {
//   res.render("index", { title: "Welcome to EJS", message: "Hello, EJS!" });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
