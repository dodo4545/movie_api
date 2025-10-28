// index.js - Main entry point for the movie API project
console.log("Welcome to the Movie API!");

// Required modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Top 10 movies data
const topMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    genre: "Drama"
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    genre: "Crime, Drama"
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    genre: "Action, Crime, Drama"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genre: "Crime, Drama"
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: "Drama, Romance"
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Action, Sci-Fi, Thriller"
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    genre: "Action, Sci-Fi"
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    director: "Martin Scorsese",
    genre: "Biography, Crime, Drama"
  },
  {
    id: 9,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    director: "Peter Jackson",
    genre: "Adventure, Drama, Fantasy"
  },
  {
    id: 10,
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    director: "George Lucas",
    genre: "Adventure, Fantasy, Sci-Fi"
  }
];

// Middleware
app.use(morgan("combined")); // Morgan middleware for logging all requests
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Express built-in JSON parser
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public folder

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Movie API! Your one-stop destination for top movie information.");
});

// Movies route - returns top 10 movies
app.get("/movies", (req, res) => {
  res.json({
    message: "Top 10 Movies",
    count: topMovies.length,
    movies: topMovies
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

// Error-handling middleware (must be defined after all other routes)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Application-level error occurred:");
  console.error("Error message:", err.message);
  console.error("Error stack:", err.stack);
  console.error("Request URL:", req.url);
  console.error("Request method:", req.method);
  console.error("Timestamp:", new Date().toISOString());
  console.error("---");
  
  res.status(500).json({
    error: "Something went wrong!",
    message: "Internal server error"
  });
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found on this server",
    url: req.url
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/ for the main page`);
  console.log(`Visit http://localhost:${PORT}/movies for the movies API`);
  console.log(`Visit http://localhost:${PORT}/documentation.html for API documentation`);
});
