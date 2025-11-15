const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/movieapiDB");

// index.js - Main entry point for the movie API project
console.log("Welcome to the Movie API!");

// Required modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Top 10 movies data with detailed structure
const topMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    director: {
      name: "Frank Darabont",
      bio: "American director, screenwriter, and producer known for his work on drama films and adaptations of Stephen King stories.",
      birth: "1959"
    },
    genre: {
      name: "Drama",
      description: "Drama films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature."
    },
    imageURL: "shawshank.jpg",
    featured: true
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    director: {
      name: "Francis Ford Coppola",
      bio: "American film director, producer, and screenwriter who was a central figure of the New Hollywood filmmaking movement.",
      birth: "1939"
    },
    genre: {
      name: "Crime",
      description: "Crime films are a genre that revolves around the action of a criminal mastermind, a crime that is being committed, or the life of a person involved in criminal activity."
    },
    imageURL: "godfather.jpg",
    featured: true
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    director: {
      name: "Christopher Nolan",
      bio: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style.",
      birth: "1970"
    },
    genre: {
      name: "Action",
      description: "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting."
    },
    imageURL: "darkknight.jpg",
    featured: true
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    director: {
      name: "Quentin Tarantino",
      bio: "American film director, writer, producer, and actor known for his nonlinear storylines and pop culture references.",
      birth: "1963"
    },
    genre: {
      name: "Crime",
      description: "Crime films are a genre that revolves around the action of a criminal mastermind, a crime that is being committed, or the life of a person involved in criminal activity."
    },
    imageURL: "pulpfiction.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    director: {
      name: "Robert Zemeckis",
      bio: "American filmmaker known for his innovative visual effects work and popular films.",
      birth: "1952"
    },
    genre: {
      name: "Drama",
      description: "Drama films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature."
    },
    imageURL: "forrestgump.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    director: {
      name: "Christopher Nolan",
      bio: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style.",
      birth: "1970"
    },
    genre: {
      name: "Sci-Fi",
      description: "Science fiction films are a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    imageURL: "inception.jpg",
    featured: true
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    director: {
      name: "Lana Wachowski, Lilly Wachowski",
      bio: "American film and television directors, writers and producers known for their science fiction work.",
      birth: "1965, 1967"
    },
    genre: {
      name: "Sci-Fi",
      description: "Science fiction films are a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    imageURL: "matrix.jpg",
    featured: false
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    director: {
      name: "Martin Scorsese",
      bio: "American film director, producer, screenwriter, and actor known for his gritty crime films.",
      birth: "1942"
    },
    genre: {
      name: "Crime",
      description: "Crime films are a genre that revolves around the action of a criminal mastermind, a crime that is being committed, or the life of a person involved in criminal activity."
    },
    imageURL: "goodfellas.jpg",
    featured: false
  },
  {
    id: 9,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    director: {
      name: "Peter Jackson",
      bio: "New Zealand film director, screenwriter, and producer best known for The Lord of the Rings trilogy.",
      birth: "1961"
    },
    genre: {
      name: "Fantasy",
      description: "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
    },
    imageURL: "lotr.jpg",
    featured: true
  },
  {
    id: 10,
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    director: {
      name: "George Lucas",
      bio: "American film director, producer, screenwriter, and entrepreneur best known for creating the Star Wars franchise.",
      birth: "1944"
    },
    genre: {
      name: "Sci-Fi",
      description: "Science fiction films are a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    imageURL: "starwars.jpg",
    featured: true
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

// Get all movies
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// Get movie by title
app.get("/movies/:title", (req, res) => {
  const title = req.params.title;
  const movie = topMovies.find(m => m.title === title);
  
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send(`Movie with title "${title}" not found.`);
  }
});

// Get genre information
app.get("/movies/genre/:genreName", (req, res) => {
  const genreName = req.params.genreName;
  
  // Find a movie with this genre to get genre info
  const movieWithGenre = topMovies.find(m => m.genre.name === genreName);
  
  if (movieWithGenre) {
    res.json(movieWithGenre.genre);
  } else {
    res.status(404).send(`Genre "${genreName}" not found.`);
  }
});

// Get director information
app.get("/movies/directors/:directorName", (req, res) => {
  const directorName = req.params.directorName;
  
  // Find a movie by this director
  const movieByDirector = topMovies.find(m => m.director.name === directorName);
  
  if (movieByDirector) {
    res.json(movieByDirector.director);
  } else {
    res.status(404).send(`Director "${directorName}" not found.`);
  }
});

// User registration
app.post("/users", (req, res) => {
  const newUser = req.body;
  
  if (newUser.username && newUser.password && newUser.email) {
    const user = {
      id: Date.now(), // Simple ID generation
      username: newUser.username,
      email: newUser.email,
      birthday: newUser.birthday || null,
      favoriteMovies: []
    };
    
    res.status(201).json(user);
  } else {
    res.status(400).send("Username, password, and email are required.");
  }
});

// Update user information
app.put("/users/:username", (req, res) => {
  const username = req.params.username;
  const updatedInfo = req.body;
  
  // Simulate updating user
  const updatedUser = {
    id: 1,
    username: updatedInfo.username || username,
    email: updatedInfo.email || "user@example.com",
    birthday: updatedInfo.birthday || "1990-01-01",
    favoriteMovies: [1, 3, 5] // Simulated existing favorites
  };
  
  res.json(updatedUser);
});

// Add movie to user's favorites
app.post("/users/:username/movies/:movieID", (req, res) => {
  const username = req.params.username;
  const movieID = req.params.movieID;
  
  res.send(`Movie with ID ${movieID} has been added to ${username}'s favorites.`);
});

// Remove movie from user's favorites
app.delete("/users/:username/movies/:movieID", (req, res) => {
  const username = req.params.username;
  const movieID = req.params.movieID;
  
  res.send(`Movie with ID ${movieID} has been removed from ${username}'s favorites.`);
});

// Delete user
app.delete("/users/:username", (req, res) => {
  const username = req.params.username;
  
  res.send(`User ${username} has been deleted successfully.`);
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
