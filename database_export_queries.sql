-- Database Export Script
-- Run this to generate a complete backup of your database

-- This will show you all the data in your database for verification
-- You can use this to create your export

-- 1. Show all tables structure and data
SELECT 'GENRES TABLE:' AS table_info;
SELECT * FROM Genres ORDER BY GenreID;

SELECT 'DIRECTORS TABLE:' AS table_info;
SELECT * FROM Directors ORDER BY DirectorID;

SELECT 'MOVIES TABLE:' AS table_info;
SELECT * FROM Movies ORDER BY MovieId;

SELECT 'USERS TABLE:' AS table_info;
SELECT * FROM Users ORDER BY UserID;

SELECT 'USER_MOVIES TABLE:' AS table_info;
SELECT * FROM User_Movies ORDER BY UserMovieID;

-- 2. Complete database overview with relationships
SELECT 'COMPLETE MOVIE DATABASE OVERVIEW:' AS overview;
SELECT 
    m.MovieId,
    m.Title,
    d.Name AS Director,
    g.Name AS Genre,
    m.Featured,
    COUNT(um.UserID) AS users_who_like_it
FROM Movies m
JOIN Directors d ON m.DirectorID = d.DirectorID
JOIN Genres g ON m.GenreID = g.GenreID
LEFT JOIN User_Movies um ON m.MovieId = um.MovieID
GROUP BY m.MovieId, m.Title, d.Name, g.Name, m.Featured
ORDER BY m.Title;