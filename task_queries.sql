-- Task Query Scripts
-- Run each section separately and take screenshots of both the query and results

-- ==========================================
-- QUERY 1: Select a single genre by name
-- ==========================================
-- First, get the genre ID for "Crime"
SELECT GenreID, Name, Description 
FROM Genres 
WHERE Name = 'Crime';

-- ==========================================
-- QUERY 2: Select all movies of that genre
-- ==========================================
-- Using the Crime genre (GenreID = 2), get all movies in that genre
SELECT m.MovieId, m.Title, m.Description, g.Name AS GenreName
FROM Movies m
JOIN Genres g ON m.GenreID = g.GenreID
WHERE g.Name = 'Crime';


-- Alternative version using the GenreID directly:
-- SELECT MovieId, Title, Description FROM Movies WHERE GenreID = 2;

-- ==========================================
-- QUERY 3: Update email address of a user by name
-- ==========================================
-- Update john_doe's email address
UPDATE Users 
SET Email = 'john.doe.updated@newemail.com' 
WHERE Username = 'john_doe';

-- Verify the update worked
SELECT UserID, Username, Email, Birth_date 
FROM Users 
WHERE Username = 'john_doe';

-- ==========================================
-- QUERY 4: Delete a movie (maintaining requirements)
-- ==========================================
-- Delete "Forrest Gump" - this is safe because:
-- - We still have "The Shawshank Redemption" as another Drama movie
-- - We still have "The Dark Knight" and "Inception" from Christopher Nolan
-- - We still have "The Godfather", "Pulp Fiction", and "Goodfellas" as Crime movies

DELETE FROM Movies 
WHERE Title = 'Forrest Gump';

-- Verify the deletion and check we still meet requirements
SELECT 'Movies remaining:' AS check_type, COUNT(*) AS count FROM Movies
UNION ALL
SELECT 'Christopher Nolan movies:', COUNT(*) FROM Movies m JOIN Directors d ON m.DirectorID = d.DirectorID WHERE d.Name = 'Christopher Nolan'
UNION ALL  
SELECT 'Crime movies:', COUNT(*) FROM Movies m JOIN Genres g ON m.GenreID = g.GenreID WHERE g.Name = 'Crime'
UNION ALL
SELECT 'Drama movies:', COUNT(*) FROM Movies m JOIN Genres g ON m.GenreID = g.GenreID WHERE g.Name = 'Drama';

-- ==========================================
-- BONUS: Show remaining movies by genre and director
-- ==========================================
SELECT 
    m.Title,
    d.Name AS Director,
    g.Name AS Genre,
    m.Description
FROM Movies m
JOIN Directors d ON m.DirectorID = d.DirectorID
JOIN Genres g ON m.GenreID = g.GenreID
ORDER BY g.Name, d.Name;