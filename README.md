# Recipe API

This is a RESTful API for managing recipes and users. It allows you to perform CRUD operations on recipes and manage user authentication.

## Features

- User authentication (login, signup)
- Recipe management (create, read, update, delete)
- Fetching recipes and users

## Technologies Used

- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL (Database)
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Install the dependencies:

   ```bash
   cd recipe-api
   yarn

3. Set up the database:

- Create a PostgreSQL database.
- Update the database configuration in `.env` file with your database credentials.

- This `.env` file includes two environment variables:

- `DATABASE_URL`: The connection URL for the PostgreSQL database. You may need to adjust the values (username, password, host, port, and database name) based on your specific configuration.
- `JWT_SECRET`: The secret key used for JSON Web Token (JWT) generation and verification. You can customize this value to a secure and unique string.

Make sure to update the values in the `.env` file with the appropriate credentials and configurations for your PostgreSQL database and JWT secret key.

4. Run database migrations:

   ```bash
   npx prisma migrate dev

5. Start the server:
  
   ```bash
   yarn dev

The API is now running locally at `http://localhost:8000`.

## API Endpoints

### Recipes

- `GET /recipes`: Retrieve all recipes.
- `GET /recipes/:id`: Retrieve a specific recipe.
- `POST /recipes`: Create a new recipe.
- `PUT /recipes/:id`: Update a specific recipe.
- `DELETE /recipes/:id`: Delete a specific recipe.


### Users

- `GET /users`: Retrieve all users.
- `GET /users/:id`: Retrieve a specific user.
- `POST /users`: Create a new user (signup).
- `POST /users/login`: Authenticate a user (login).


## Authentication

The API uses JWT (JSON Web Tokens) for user authentication. To access protected routes, you need to include an Authorization header with a valid JWT token in your request.

**Example:**

    Authorization: Bearer <token>
    
## Error Handling

Errors are returned as JSON objects with the following structure:
  ```json      
      {
        "success": false,
        "message": "Error message"
      }
