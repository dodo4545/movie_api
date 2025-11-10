-- Movie API Database Setup Script
-- Clean SQL script without any text labels that could cause syntax errors

-- Drop existing tables in correct order
DROP TABLE IF EXISTS User_Movies CASCADE;
DROP TABLE IF EXISTS Movies CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Directors CASCADE;
DROP TABLE IF EXISTS Genres CASCADE;

-- Create Genres table
CREATE TABLE Genres (
  GenreID SERIAL PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Description TEXT
);

-- Create Directors table  
CREATE TABLE Directors (
  DirectorID SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Bio TEXT,
  Birth_Year VARCHAR(20),
  Death_Year VARCHAR(20)
);

-- Create Movies table with your exact specifications
CREATE TABLE Movies (
  MovieId SERIAL PRIMARY KEY,
  Title VARCHAR(50) NOT NULL,
  Description VARCHAR(1000),
  DirectorID INTEGER NOT NULL,
  GenreID INTEGER NOT NULL,
  ImageURL VARCHAR(300),
  Featured BOOLEAN,
  CONSTRAINT GenreKey FOREIGN KEY (GenreID) REFERENCES Genres (GenreID),
  CONSTRAINT DirectorKey FOREIGN KEY (DirectorID) REFERENCES Directors (DirectorID)
);

-- Create Users table with your specifications
CREATE TABLE Users (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(50) NOT NULL,
  Password VARCHAR(50) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  Birth_date DATE
);

-- Create User-Movies junction table
CREATE TABLE User_Movies (
  UserMovieID SERIAL PRIMARY KEY,
  UserID INTEGER,
  MovieID INTEGER,
  CONSTRAINT UserKey FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT MovieKey FOREIGN KEY (MovieID) REFERENCES Movies(MovieId)
);

-- Insert sample genres
INSERT INTO Genres (Name, Description) VALUES 
('Drama', 'Serious presentations or stories with realistic characters in conflict'),
('Crime', 'Films revolving around criminal activity and law enforcement'),
('Action', 'Films with action sequences like fighting, stunts, and chases'),
('Sci-Fi', 'Science fiction films with speculative technology and concepts'),
('Fantasy', 'Films with magical themes and supernatural elements');

-- Insert sample directors
INSERT INTO Directors (Name, Bio, Birth_Year, Death_Year) VALUES 
('Frank Darabont', 'American director known for Stephen King adaptations', '1959', NULL),
('Francis Ford Coppola', 'Legendary director of The Godfather series', '1939', NULL),
('Christopher Nolan', 'British director known for complex narratives', '1970', NULL),
('Quentin Tarantino', 'Director known for nonlinear storylines', '1963', NULL),
('Robert Zemeckis', 'Director known for innovative visual effects', '1952', NULL),
('Martin Scorsese', 'Master of crime and biographical films', '1942', NULL),
('Peter Jackson', 'New Zealand director of epic fantasy films', '1961', NULL),
('George Lucas', 'Creator of Star Wars and Indiana Jones', '1944', NULL),
('Wachowski Sisters', 'Directors known for The Matrix series', '1965', NULL);

-- Insert sample movies (shortened titles to fit 50 char limit)
INSERT INTO Movies (Title, Description, DirectorID, GenreID, ImageURL, Featured) VALUES 
('The Shawshank Redemption', 'Two prisoners find solace and redemption through acts of common decency', 1, 1, 'shawshank.jpg', TRUE),
('The Godfather', 'Aging patriarch transfers control of crime empire to reluctant son', 2, 2, 'godfather.jpg', TRUE),
('The Dark Knight', 'Batman faces his greatest psychological and physical test', 3, 3, 'darkknight.jpg', TRUE),
('Pulp Fiction', 'Interconnected stories of violence and redemption', 4, 2, 'pulpfiction.jpg', FALSE),
('Forrest Gump', 'Simple man witnesses and influences major historical events', 5, 1, 'forrestgump.jpg', FALSE),
('Inception', 'Thief enters dreams to plant an idea in someones mind', 3, 4, 'inception.jpg', TRUE),
('The Matrix', 'Hacker discovers reality is a computer simulation', 9, 4, 'matrix.jpg', FALSE),
('Goodfellas', 'Rise and fall of a mob associate', 6, 2, 'goodfellas.jpg', FALSE),
('LOTR Fellowship', 'Hobbit begins quest to destroy powerful ring', 7, 5, 'lotr.jpg', TRUE),
('Star Wars', 'Young farm boy joins rebellion against evil empire', 8, 4, 'starwars.jpg', TRUE);

-- Insert sample users (at least 3 required)
INSERT INTO Users (Username, Password, Email, Birth_date) VALUES 
('john_doe', 'password123', 'john.doe@email.com', '1985-03-15'),
('jane_smith', 'mypassword', 'jane.smith@email.com', '1990-07-22'),
('movie_buff', 'cinema2023', 'moviebuff@email.com', '1988-11-03'),
('film_critic', 'reviews456', 'critic@email.com', '1975-09-12'),
('casual_viewer', 'watchlist', 'viewer@email.com', '1995-05-08');

-- Insert user-movie relationships (at least 3 pairs required)
INSERT INTO User_Movies (UserID, MovieID) VALUES 
(1, 1), -- john_doe likes Shawshank Redemption
(1, 3), -- john_doe likes Dark Knight
(1, 6), -- john_doe likes Inception
(2, 2), -- jane_smith likes Godfather
(2, 4), -- jane_smith likes Pulp Fiction
(2, 8), -- jane_smith likes Goodfellas
(3, 1), -- movie_buff likes Shawshank Redemption
(3, 9), -- movie_buff likes LOTR
(3, 10), -- movie_buff likes Star Wars
(4, 2), -- film_critic likes Godfather
(4, 4), -- film_critic likes Pulp Fiction
(5, 7), -- casual_viewer likes Matrix
(5, 10); -- casual_viewer likes Star Wars