// index.js - Main entry point for the movie API project
console.log("Welcome to the Movie API!");

// Express server setup
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Express built-in JSON parser (redundant but kept for compatibility)

// Basic route
app.get("/", (req, res) => {
  res.send("Movie API Server is running with Express!");
});

// Movies routes
app.get("/movies", (req, res) => {
  res.json({
    message: "Movies endpoint",
    movies: []
  });
});

// POST route to demonstrate body-parser
app.post("/movies", (req, res) => {
  console.log("Request body:", req.body); // body-parser makes this available
  res.json({
    message: "Movie created successfully",
    receivedData: req.body
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
