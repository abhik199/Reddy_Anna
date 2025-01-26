const { Router } = require("express");

const adminR = Router();

adminR.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  // Example credentials - Replace with actual verification logic (e.g., database check)
  const adminUsername = "admin@123";
  const adminPassword = "admin@123";

  console.log(req.session.isLoggedIn);

  if (username === adminUsername && password === adminPassword) {
    // Correct credentials: set session and redirect after 2 seconds
    req.session.isLoggedIn = true;
    req.session.user = username;
    console.log(req.session.isLoggedIn);

    // Using async/await to simulate delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    res.redirect("/admin/dashboard"); // Redirect to dashboard after 2 seconds
  } else {
    // Incorrect credentials: redirect to login page with error message after 2 seconds
    req.session.error = "Invalid username or password!";
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    res.redirect("/"); // Redirect to login page after 2 seconds
  }
});

// Middleware to protect routes
const isAuthenticated = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next(); // If logged in, proceed to the next middleware or route handler
  } else {
    req.session.error = "Please log in to access this page."; // Set an error message
    return res.redirect("/"); // Redirect to login page if not logged in
  }
};

// Apply the authentication middleware to all admin routes
adminR.use("/admin", isAuthenticated); // Protect all routes that start with /admin

// Protected admin routes
adminR.get("/admin/dashboard", async (req, res) => {
  res.render("index"); // Render the dashboard page
});

adminR.get("/admin/user", async (req, res) => {
  res.render("userList"); // Render the user list page
});

adminR.get("/admin/contact", async (req, res) => {
  res.render("contact"); // Render the contact page
});

adminR.get("/admin/addBlog", async (req, res) => {
  res.render("addBlog"); // Render the add blog page
});

// Logout route to destroy the session
adminR.get("/admin/logout", async (req, res) => {
  await new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return reject(err);
      }
      resolve();
    });
  });
  res.redirect("/"); // Redirect to login page after logging out
});

// Login route for authentication

module.exports = adminR;
