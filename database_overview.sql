-- Method 2: Complete Database Overview Queries
-- Run each query separately in pgAdmin to see all your data

-- ==========================================
-- 1. VIEW ALL GENRES
-- ==========================================
SELECT * FROM Genres ORDER BY GenreID;

-- ==========================================
-- 2. VIEW ALL DIRECTORS
-- ==========================================
SELECT * FROM Directors ORDER BY DirectorID;

-- ==========================================
-- 3. VIEW ALL MOVIES WITH GENRE AND DIRECTOR NAMES
-- ==========================================
SELECT 
    m.MovieId,
    m.Title,
    d.Name AS Director,
    g.Name AS Genre,
    m.Description,
    m.Featured,
    m.ImageURL
FROM Movies m
JOIN Directors d ON m.DirectorID = d.DirectorID
JOIN Genres g ON m.GenreID = g.GenreID
ORDER BY m.Title;

-- ==========================================
-- 4. VIEW ALL USERS
-- ==========================================
SELECT * FROM Users ORDER BY UserID;

-- ==========================================
-- 5. VIEW USER MOVIE PREFERENCES
-- ==========================================
SELECT 
    u.Username,
    m.Title AS Movie,
    g.Name AS Genre,
    d.Name AS Director
FROM User_Movies um
JOIN Users u ON um.UserID = u.UserID
JOIN Movies m ON um.MovieID = m.MovieId
JOIN Genres g ON m.GenreID = g.GenreID
JOIN Directors d ON m.DirectorID = d.DirectorID
ORDER BY u.Username, m.Title;

-- ==========================================
-- 6. DATABASE STATISTICS SUMMARY
-- ==========================================
SELECT 'Total Genres' AS Item, COUNT(*)::text AS Count FROM Genres
UNION ALL
SELECT 'Total Directors', COUNT(*)::text FROM Directors  
UNION ALL
SELECT 'Total Movies', COUNT(*)::text FROM Movies
UNION ALL
SELECT 'Total Users', COUNT(*)::text FROM Users
UNION ALL
SELECT 'Total User-Movie Relations', COUNT(*)::text FROM User_Movies;

-- ==========================================
-- 7. MOVIES BY GENRE (SHOWING TASK REQUIREMENTS)
-- ==========================================
SELECT 
    g.Name AS Genre,
    COUNT(m.MovieId) AS Movie_Count,
    STRING_AGG(m.Title, ', ' ORDER BY m.Title) AS Movies
FROM Genres g
LEFT JOIN Movies m ON g.GenreID = m.GenreID
GROUP BY g.GenreID, g.Name
ORDER BY Movie_Count DESC;

-- ==========================================
-- 8. MOVIES BY DIRECTOR (SHOWING TASK REQUIREMENTS)
-- ==========================================
SELECT 
    d.Name AS Director,
    COUNT(m.MovieId) AS Movie_Count,
    STRING_AGG(m.Title, ', ' ORDER BY m.Title) AS Movies
FROM Directors d
LEFT JOIN Movies m ON d.DirectorID = m.DirectorID
GROUP BY d.DirectorID, d.Name
HAVING COUNT(m.MovieId) > 0
ORDER BY Movie_Count DESC;