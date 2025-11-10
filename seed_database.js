// seed_database.js - Script to populate MongoDB with sample data
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/movieapiDB");

// Sample movies data
const sampleMovies = [
  {
    Title: "Inception",
    Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction films are a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style and complex narratives."
    },
    Actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    ImagePath: "inception.jpg",
    Featured: true
  },
  {
    Title: "The Dark Knight",
    Description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Genre: {
      Name: "Action",
      Description: "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style and complex narratives."
    },
    Actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    ImagePath: "darkknight.jpg",
    Featured: true
  },
  {
    Title: "The Shawshank Redemption",
    Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Genre: {
      Name: "Drama",
      Description: "Drama films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature."
    },
    Director: {
      Name: "Frank Darabont",
      Bio: "American director, screenwriter, and producer known for his work on drama films and adaptations of Stephen King stories."
    },
    Actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    ImagePath: "shawshank.jpg",
    Featured: true
  },
  {
    Title: "Pulp Fiction",
    Description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    Genre: {
      Name: "Crime",
      Description: "Crime films are a genre that revolves around the action of a criminal mastermind, a crime that is being committed, or the life of a person involved in criminal activity."
    },
    Director: {
      Name: "Quentin Tarantino",
      Bio: "American film director, writer, producer, and actor known for his nonlinear storylines and pop culture references."
    },
    Actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    ImagePath: "pulpfiction.jpg",
    Featured: false
  },
  {
    Title: "The Matrix",
    Description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction films are a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    Director: {
      Name: "Wachowski Sisters",
      Bio: "American film and television directors, writers and producers known for their science fiction work."
    },
    Actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    ImagePath: "matrix.jpg",
    Featured: true
  },
  {
    Title: "Goodfellas",
    Description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    Genre: {
      Name: "Crime",
      Description: "Crime films are a genre that revolves around the action of a criminal mastermind, a crime that is being committed, or the life of a person involved in criminal activity."
    },
    Director: {
      Name: "Martin Scorsese",
      Bio: "American film director, producer, screenwriter, and actor known for his gritty crime films."
    },
    Actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    ImagePath: "goodfellas.jpg",
    Featured: false
  },
  {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    Genre: {
      Name: "Fantasy",
      Description: "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
    },
    Director: {
      Name: "Peter Jackson",
      Bio: "New Zealand film director, screenwriter, and producer best known for The Lord of the Rings trilogy."
    },
    Actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    ImagePath: "lotr.jpg",
    Featured: true
  },
  {
    Title: "Forrest Gump",
    Description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    Genre: {
      Name: "Drama",
      Description: "Drama films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature."
    },
    Director: {
      Name: "Robert Zemeckis",
      Bio: "American filmmaker known for his innovative visual effects work and popular films."
    },
    Actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    ImagePath: "forrestgump.jpg",
    Featured: false
  },
  {
    Title: "Star Wars",
    Description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction films are a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    Director: {
      Name: "George Lucas",
      Bio: "American film director, producer, screenwriter, and entrepreneur best known for creating the Star Wars franchise."
    },
    Actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    ImagePath: "starwars.jpg",
    Featured: true
  },
  {
    Title: "The Godfather",
    Description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    Genre: {
      Name: "Crime",
      Description: "Crime films are a genre that revolves around the action of a criminal mastermind, a crime that is being committed, or the life of a person involved in criminal activity."
    },
    Director: {
      Name: "Francis Ford Coppola",
      Bio: "American film director, producer, and screenwriter who was a central figure of the New Hollywood filmmaking movement."
    },
    Actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    ImagePath: "godfather.jpg",
    Featured: true
  }
];

// Sample users data
const sampleUsers = [
  {
    Username: "johndoe",
    Password: "password123",
    Email: "john@example.com",
    Birthday: new Date("1990-01-15")
  },
  {
    Username: "janesmit",
    Password: "mypassword",
    Email: "jane@example.com",
    Birthday: new Date("1985-05-22")
  },
  {
    Username: "moviefan",
    Password: "cinema2023",
    Email: "fan@example.com",
    Birthday: new Date("1992-11-03")
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    console.log("Clearing existing data...");
    await Movies.deleteMany({});
    await Users.deleteMany({});
    
    console.log("Adding movies to database...");
    const createdMovies = await Movies.insertMany(sampleMovies);
    console.log(`✅ Added ${createdMovies.length} movies`);
    
    console.log("Adding users to database...");
    const createdUsers = await Users.insertMany(sampleUsers);
    console.log(`✅ Added ${createdUsers.length} users`);
    
    // Add some movies to user favorites
    console.log("Adding favorite movies to users...");
    await Users.findOneAndUpdate(
      { Username: "johndoe" },
      { $push: { FavoriteMovies: createdMovies[0]._id } }
    );
    await Users.findOneAndUpdate(
      { Username: "janesmit" },
      { $push: { FavoriteMovies: { $each: [createdMovies[1]._id, createdMovies[2]._id] } } }
    );
    console.log("✅ Added favorite movies");
    
    console.log("\n🎉 Database seeded successfully!");
    console.log("\nSample data summary:");
    console.log(`- ${createdMovies.length} movies`);
    console.log(`- ${createdUsers.length} users`);
    console.log("\nYou can now test your API endpoints in Postman!");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();
