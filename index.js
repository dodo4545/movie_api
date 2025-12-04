// index.js - Main entry point for the movie API project
console.log("Welcome to the Movie API!");

// Required modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const Models = require("./models.js");
const passport = require("passport");
require("./passport");

const Movies = Models.Movie;
const Users = Models.User;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/movieapiDB");

const app = express();

// Middleware
app.use(morgan("combined")); // Morgan middleware for logging all requests
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Express built-in JSON parser
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public folder

// Import auth routes
require("./auth")(app);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Movie API! Your one-stop destination for top movie information.");
});

// Get all movies (Protected)
app.get("/movies", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get movie by title (Protected)
app.get("/movies/:title", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).send(`Movie with title "${req.params.title}" not found.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get genre information (Protected)
app.get("/movies/genre/:genreName", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie.Genre);
      } else {
        res.status(404).send(`Genre "${req.params.genreName}" not found.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get director information (Protected)
app.get("/movies/directors/:directorName", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie.Director);
      } else {
        res.status(404).send(`Director "${req.params.directorName}" not found.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// User registration (Public - no authentication required)
app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Update user information (Protected)
app.put("/users/:Username", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Check if the authenticated user matches the user being updated
  if (req.user.Username !== req.params.Username) {
    return res.status(403).send("Permission denied: You can only update your own account.");
  }

  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send(`User ${req.params.Username} not found.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Add movie to user's favorites (Protected)
app.post("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Check if the authenticated user matches the user being updated
  if (req.user.Username !== req.params.Username) {
    return res.status(403).send("Permission denied: You can only modify your own favorites.");
  }

  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send(`User ${req.params.Username} not found.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Remove movie from user's favorites (Protected)
app.delete("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Check if the authenticated user matches the user being updated
  if (req.user.Username !== req.params.Username) {
    return res.status(403).send("Permission denied: You can only modify your own favorites.");
  }

  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send(`User ${req.params.Username} not found.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Delete user (Protected)
app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Check if the authenticated user matches the user being deleted
  if (req.user.Username !== req.params.Username) {
    return res.status(403).send("Permission denied: You can only delete your own account.");
  }

  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (user) {
        res.status(200).send(`User ${req.params.Username} has been deleted successfully.`);
      } else {
        res.status(404).send(`User ${req.params.Username} was not found.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
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
