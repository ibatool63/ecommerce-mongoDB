const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn"); // Optional middleware if needed
const { registerUser, loginUser, logout } = require("../controllers/authController");

router.get("/", function(req, res){
    res.send("hey its working");
});

// Register and Login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Logout route (with middleware if needed)
router.get("/logout", logout);

module.exports = router;
