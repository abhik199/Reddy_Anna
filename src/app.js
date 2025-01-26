const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const bodyParser = require("body-parser");
const { JWT_SECRET } = require("../conf/j.token");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("../conf/database");

app.use(
  session({
    secret: JWT_SECRET, // Your secret for the session
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30, // Session expires in 30 minutes
      httpOnly: true, // Ensures cookies are not accessible via JavaScript
    },
  })
);

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set the views directory (optional, defaults to './views')
app.set("views", path.join(__dirname, "../src/views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Define a route

app.get("/", (req, res) => {
  const error = req.session.error || null; // Retrieve error from session if it exists
  req.session.error = null; // Clear the error after reading it
  res.render("login", { error }); // Pass 'error' to the EJS template
});

// admin routes

app.use("/", require("./routes/admin/staticR"));
app.use("/api/auth", require("./routes/routes/authRoutes"));
// app.get("/", (req, res) => {
//   res.render("index", { title: "Welcome to EJS", message: "Hello, EJS!" });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
