# Achievement 2 - Movie API Portfolio Entry

## Project Overview

### Brief Description
The Movie API is a RESTful web service built with Node.js and Express that provides users with access to information about movies, directors, and genres. Users can create accounts, manage their profiles, and maintain a list of favorite movies. The API implements JWT-based authentication, password hashing with bcrypt, and data validation to ensure secure and reliable operations.

### Project Role & Tasks
**Role:** Full-Stack Backend Developer

**Tasks Faced:**
- Designed and implemented a RESTful API with 10 distinct endpoints
- Integrated MongoDB with Mongoose ODM for data persistence
- Implemented user authentication using JWT and Passport.js
- Added bcrypt password hashing for secure credential storage
- Configured CORS to allow cross-origin requests
- Implemented server-side data validation using express-validator
- Deployed the application to Heroku with MongoDB Atlas integration
- Created database seeding scripts for test data

### Key Decisions & Consequences

**Decision 1: Using JWT for Authentication**
- **Why:** Stateless authentication allows for better scalability and works well with RESTful APIs
- **Consequence:** Required implementing Passport.js strategies and managing token expiration (7-day lifespan)

**Decision 2: MongoDB Atlas for Database Hosting**
- **Why:** Cloud-hosted database ensures the app works on Heroku without local database dependencies
- **Consequence:** Had to manage connection strings as environment variables and configure network access whitelist

**Decision 3: Implementing CORS for All Origins**
- **Why:** Makes the API accessible to any frontend application during development and allows broader integration
- **Consequence:** More permissive security posture, but appropriate for a learning project and public API

**Decision 4: Separating Authentication Logic (auth.js)**
- **Why:** Keeps code modular and authentication concerns separated from main routing logic
- **Consequence:** Cleaner codebase, easier to maintain and debug authentication issues

### What I Would Do Differently

1. **Implement Rate Limiting:** Add rate limiting middleware to prevent API abuse
2. **Add API Documentation:** Use Swagger/OpenAPI to create interactive API documentation
3. **Improve Error Handling:** Create custom error classes and more consistent error responses
4. **Add Logging:** Implement Winston or similar logging library for better production monitoring
5. **Write Tests:** Add unit and integration tests using Jest or Mocha
6. **Add Pagination:** Implement pagination for the /movies endpoint to handle larger datasets
7. **Environment-Specific CORS:** Use different CORS policies for development vs. production

### Lessons Learned

1. **Environment Variables Are Critical:** Managing sensitive data (database credentials, JWT secrets) through environment variables is essential for security and deployment flexibility

2. **Validation Prevents Problems:** Server-side validation catches bad data before it reaches the database, preventing data integrity issues

3. **Password Security Matters:** Never store plain-text passwords; bcrypt hashing is straightforward to implement and crucial for user security

4. **Deployment Complexity:** Moving from local development to production revealed issues with database connections, environment configurations, and CORS that weren't apparent locally

5. **Mongoose Simplifies MongoDB:** The ODM layer makes database operations cleaner and provides built-in validation and schema enforcement

6. **Authentication vs. Authorization:** Understanding the difference between identifying users (authentication) and controlling access (authorization) was key to implementing protected routes

7. **Git Workflow:** Regular commits and pushing changes to both GitHub and Heroku helped maintain code history and deployment reliability

## Project Materials

### Screenshots
*[Add screenshots of:]*
- Postman testing user registration with valid data
- Postman testing user registration with invalid data (showing validation errors)
- Postman login request showing JWT token generation
- Postman GET /movies request with Bearer token authentication
- MongoDB Atlas showing the movieapidb database with collections
- Heroku dashboard showing deployed application

### Links

**GitHub Repository:**
https://github.com/dodo4545/movie_api

**Live API URL:**
https://movies-flix-b156c4ea2632.herokuapp.com/

**MongoDB Atlas:**
Database: movieapidb (hosted on MongoDB Atlas free tier)

### Technologies Used

**Backend Framework:**
- Node.js (v22.21.1)
- Express.js (4.21.1)

**Database:**
- MongoDB (cloud-hosted on MongoDB Atlas)
- Mongoose ODM (8.8.4)

**Authentication & Security:**
- Passport.js (0.7.0)
- passport-jwt (4.0.1)
- passport-local (1.0.0)
- jsonwebtoken (9.0.2)
- bcrypt (6.0.0)

**Validation & Middleware:**
- express-validator (7.3.0)
- cors (2.8.5)
- body-parser (1.20.3)
- morgan (1.10.0) - HTTP request logger

**Development Tools:**
- Git & GitHub (version control)
- Heroku (cloud platform deployment)
- Postman (API testing)
- VS Code (code editor)
- ESLint (code quality)

**Other:**
- dotenv (17.2.3) - environment variable management

### API Endpoints

#### Public Endpoints
- **POST /users** - Register a new user (with validation)
- **POST /login** - User login (returns JWT token)

#### Protected Endpoints (Require JWT Authentication)
- **GET /movies** - Get all movies
- **GET /movies/:title** - Get a single movie by title
- **GET /movies/genre/:genreName** - Get genre information
- **GET /movies/directors/:directorName** - Get director information
- **PUT /users/:Username** - Update user information (with validation)
- **POST /users/:Username/movies/:MovieID** - Add movie to favorites
- **DELETE /users/:Username/movies/:MovieID** - Remove movie from favorites
- **DELETE /users/:Username** - Delete user account

### Project Development Materials

**README.md**
- Complete documentation of the API
- Installation instructions
- Endpoint descriptions
- Authentication guide

**Seed Database Script (seed_database.js)**
- Automated script to populate MongoDB with test data
- 10 sample movies across various genres
- 3 test user accounts
- Sample favorite movie relationships

**Data Models:**
- **Movie Schema:** Title, Description, Genre (Name, Description), Director (Name, Bio), Actors, ImagePath, Featured
- **User Schema:** Username, Password (hashed), Email, Birthday, FavoriteMovies (array of Movie IDs)

### Development Process

**Version Control:**
- Regular Git commits documenting feature additions and bug fixes
- GitHub repository maintaining project history
- Separate deployment to Heroku using git push heroku main

**Testing Approach:**
- Manual API testing using Postman
- Tested all CRUD operations
- Validated authentication flow (register → login → access protected routes)
- Tested data validation with both valid and invalid inputs
- Verified password hashing in database
- Confirmed CORS functionality

**Deployment Strategy:**
1. Local development with MongoDB local instance
2. Migration to MongoDB Atlas for cloud database
3. Environment variable configuration for database connection
4. Heroku deployment with environment variable management
5. Testing production endpoints to ensure functionality

### Challenges Overcome

1. **MongoDB Atlas Connection Issues:** Resolved DNS and authentication errors by correctly configuring connection strings and database user credentials

2. **CORS Configuration:** Initially restricted origins, then updated to allow all domains for broader accessibility

3. **Password Hashing Integration:** Successfully integrated bcrypt into both user registration and update workflows

4. **JWT Token Management:** Implemented secure token generation and validation using Passport.js strategies

5. **Data Validation:** Added express-validator middleware to ensure data integrity before database operations

6. **Heroku Environment Variables:** Learned to properly manage sensitive configuration through Heroku config vars

---

## Reflection Summary

This project provided hands-on experience building a production-ready RESTful API from the ground up. The most valuable learning came from dealing with real-world deployment challenges, security considerations, and the integration of multiple technologies into a cohesive backend service. The process of moving from local development to cloud deployment revealed many hidden complexities that don't appear in tutorials, making this a truly practical learning experience.

The Movie API serves as a solid foundation for understanding backend development, authentication patterns, database integration, and API design principles that will be applicable to future full-stack projects.
