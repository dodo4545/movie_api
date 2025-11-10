# Movie API - Mongoose Integration Reference

## ✅ Completed Tasks

### 1. Models Created (models.js)
- ✅ Movie schema with Genre and Director embedded
- ✅ User schema with FavoriteMovies array
- ✅ Models exported with module.exports

### 2. Index.js Updated
- ✅ Mongoose and Models imported
- ✅ MongoDB connection established
- ✅ All 9 endpoints updated with Mongoose logic
- ✅ Removed hardcoded topMovies array

## API Endpoints with Mongoose Logic

### 1. GET /movies
**Description**: Return a list of ALL movies
**Method**: GET
**URL**: `http://localhost:8080/movies`
**Request Body**: None
**Response Example**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "Title": "Inception",
    "Description": "A thief who steals corporate secrets...",
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Science fiction films..."
    },
    "Director": {
      "Name": "Christopher Nolan",
      "Bio": "British-American film director..."
    },
    "ImagePath": "inception.jpg",
    "Featured": true
  }
]
```

### 2. GET /movies/:title
**Description**: Return data about a single movie by title
**Method**: GET
**URL**: `http://localhost:8080/movies/Inception`
**URL Parameters**: `title` (string)
**Request Body**: None
**Response Example**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "Title": "Inception",
  "Description": "A thief who steals corporate secrets...",
  "Genre": {
    "Name": "Sci-Fi",
    "Description": "Science fiction films..."
  },
  "Director": {
    "Name": "Christopher Nolan",
    "Bio": "British-American film director..."
  },
  "ImagePath": "inception.jpg",
  "Featured": true
}
```

### 3. GET /movies/genre/:genreName
**Description**: Return data about a genre by name
**Method**: GET
**URL**: `http://localhost:8080/movies/genre/Sci-Fi`
**URL Parameters**: `genreName` (string)
**Request Body**: None
**Response Example**:
```json
{
  "Name": "Sci-Fi",
  "Description": "Science fiction films are a genre that uses speculative, fictional science-based depictions..."
}
```

### 4. GET /movies/directors/:directorName
**Description**: Return data about a director by name
**Method**: GET
**URL**: `http://localhost:8080/movies/directors/Christopher%20Nolan`
**URL Parameters**: `directorName` (string)
**Request Body**: None
**Response Example**:
```json
{
  "Name": "Christopher Nolan",
  "Bio": "British-American film director, producer, and screenwriter known for his distinctive filmmaking style."
}
```

### 5. POST /users
**Description**: Allow new users to register
**Method**: POST
**URL**: `http://localhost:8080/users`
**Request Body** (JSON):
```json
{
  "Username": "johndoe",
  "Password": "password123",
  "Email": "john@example.com",
  "Birthday": "1990-01-01"
}
```
**Response Example**:
```json
{
  "_id": "507f191e810c19729de860ea",
  "Username": "johndoe",
  "Password": "password123",
  "Email": "john@example.com",
  "Birthday": "1990-01-01T00:00:00.000Z",
  "FavoriteMovies": []
}
```

### 6. PUT /users/:Username
**Description**: Allow users to update their user info
**Method**: PUT
**URL**: `http://localhost:8080/users/johndoe`
**URL Parameters**: `Username` (string)
**Request Body** (JSON):
```json
{
  "Username": "johndoe_updated",
  "Password": "newpassword456",
  "Email": "newemail@example.com",
  "Birthday": "1990-01-01"
}
```
**Response Example**:
```json
{
  "_id": "507f191e810c19729de860ea",
  "Username": "johndoe_updated",
  "Password": "newpassword456",
  "Email": "newemail@example.com",
  "Birthday": "1990-01-01T00:00:00.000Z",
  "FavoriteMovies": []
}
```

### 7. POST /users/:Username/movies/:MovieID
**Description**: Allow users to add a movie to their list of favorites
**Method**: POST
**URL**: `http://localhost:8080/users/johndoe/movies/507f1f77bcf86cd799439011`
**URL Parameters**: 
- `Username` (string)
- `MovieID` (string - MongoDB ObjectId)
**Request Body**: None
**Response Example**:
```json
{
  "_id": "507f191e810c19729de860ea",
  "Username": "johndoe",
  "Password": "password123",
  "Email": "john@example.com",
  "Birthday": "1990-01-01T00:00:00.000Z",
  "FavoriteMovies": ["507f1f77bcf86cd799439011"]
}
```

### 8. DELETE /users/:Username/movies/:MovieID
**Description**: Allow users to remove a movie from their list of favorites
**Method**: DELETE
**URL**: `http://localhost:8080/users/johndoe/movies/507f1f77bcf86cd799439011`
**URL Parameters**: 
- `Username` (string)
- `MovieID` (string - MongoDB ObjectId)
**Request Body**: None
**Response Example**:
```json
{
  "_id": "507f191e810c19729de860ea",
  "Username": "johndoe",
  "Password": "password123",
  "Email": "john@example.com",
  "Birthday": "1990-01-01T00:00:00.000Z",
  "FavoriteMovies": []
}
```

### 9. DELETE /users/:Username
**Description**: Allow existing users to deregister
**Method**: DELETE
**URL**: `http://localhost:8080/users/johndoe`
**URL Parameters**: `Username` (string)
**Request Body**: None
**Response Example**: 
```
User johndoe has been deleted successfully.
```

## Next Steps

1. **Install and Start MongoDB**:
   ```bash
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. **Add Sample Data to MongoDB** (optional for testing):
   You'll need to manually add some movies and users to your MongoDB database before testing

3. **Test Each Endpoint in Postman**:
   - Import or create requests for all 9 endpoints
   - Test with sample data
   - Take screenshots of each request and response
   
4. **Update documentation.html**:
   - Replace old request/response examples with the ones above
   - Include MongoDB ObjectId format in examples
   
5. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Integrate Mongoose with Movie API endpoints"
   git push origin main
   ```

6. **Create Zip File**:
   - Create zip of project repository
   - Create zip of Postman screenshots
   - Submit both zip files along with GitHub link