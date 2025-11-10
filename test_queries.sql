-- Test queries for Movie API database
-- Use these to verify your database setup

-- 1. View all genres
SELECT * FROM Genres;

-- 2. View all directors
SELECT * FROM Directors;

-- 3. View all movies with their directors and genres
SELECT 
    m.title,
    m.description,
    m.release_year,
    d.name AS director_name,
    g.name AS genre_name
FROM Movies m
JOIN Directors d ON m.director_id = d.director_id
JOIN Genres g ON m.genre_id = g.genre_id
ORDER BY m.title;

-- 4. Count movies by genre
SELECT 
    g.name AS genre,
    COUNT(m.movie_id) AS movie_count
FROM Genres g
LEFT JOIN Movies m ON g.genre_id = m.genre_id
GROUP BY g.genre_id, g.name
ORDER BY movie_count DESC;

-- 5. Movies released after 2010
SELECT 
    title,
    release_year,
    rating
FROM Movies 
WHERE release_year > 2010
ORDER BY release_year DESC;
SELECT * FROM Genres;
