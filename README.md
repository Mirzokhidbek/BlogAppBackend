# BlogAppBackend

A REST API for a blog app, built with Node.js, Express 5 and MongoDB (Mongoose). Users sign up and log in with JWT authentication, and logged-in users can create blog posts.

## Tech stack

- **Express 5**: HTTP server and routing
- **MongoDB + Mongoose**: database and models
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: password hashing
- **express-validator**: request validation
- **http-status-codes**: HTTP status constants
- **cors**, **dotenv**
- **nodemon**: auto-reload during development

## Getting started

### Requirements

- Node.js 18+
- A MongoDB instance (local or MongoDB Atlas)

### Install

```bash
git clone https://github.com/Mirzokhidbek/BlogAppBackend.git
cd BlogAppBackend
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

| Variable      | Description                        | Default |
| ------------- | ---------------------------------- | ------- |
| `PORT`        | Port the server listens on         | `8080`  |
| `MONGODB_URI` | MongoDB connection string          | none    |
| `JWT_SECRET`  | Secret key used to sign JWT tokens | none    |
| `NODE_ENV`    | Environment name                   | none    |

### Run

```bash
npm run dev    # development, with nodemon
npm start      # production
```

The server runs at `http://localhost:8080`.

## API

### General

| Method | Path | Auth | Description     |
| ------ | ---- | ---- | --------------- |
| GET    | `/`  | No   | Welcome message |

### Users: `/users`

| Method | Path            | Auth | Description              |
| ------ | --------------- | ---- | ------------------------ |
| POST   | `/users/signup` | No   | Register a new user      |
| POST   | `/users/login`  | No   | Log in and get a JWT     |
| GET    | `/users/me`     | Yes  | Get the current profile  |

**Sign up**: `POST /users/signup`

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "Password123"
}
```

The password must be at least 8 characters and include a lowercase letter, an uppercase letter and a number.

**Log in**: `POST /users/login`

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:

```json
{ "token": "<jwt>" }
```

The token expires after 1 hour.

### Blogs: `/blogs`

| Method | Path         | Auth | Description       |
| ------ | ------------ | ---- | ----------------- |
| POST   | `/blogs/add` | Yes  | Create a new blog |

```json
{
  "title": "My first post",
  "content": "Hello world"
}
```

`title` and `content` are required. The blog's author is set from the logged-in user.

### Authentication

Protected routes need the JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Errors

Errors are returned in this format:

```json
{
  "error": {
    "message": "Unauthorized",
    "status_code": 401
  }
}
```

## Data models

**User**: `name`, `email` (unique), `password` (hashed), `role` (`user` | `admin`, default `user`), `status` (`active` | `inactive`, default `active`), timestamps.

**Blog**: `title`, `content`, `author` (the user who created it), `status` (`published` | `draft` | `archived`, default `published`), timestamps.

## Project structure

```
src/
├── index.js                 # App entry point: Express setup, middleware, routes
├── controllers/
│   ├── blog/                # Blog handlers
│   └── user/                # Sign up, login, profile handlers
├── middleware/
│   ├── auth.middleware.js   # JWT check, sets req.user
│   └── error.middleware.js  # Central error handler
├── models/
│   ├── blog/                # Blog schema
│   └── user/                # User schema
├── routes/
│   ├── index.js             # Root router
│   ├── blog/
│   └── user/
├── utils/
│   ├── constants.js         # Collection names
│   ├── database.config.js   # MongoDB connection
│   ├── httpException.js     # Error class with a status code
│   └── secrets.js           # Reads environment variables
└── validators/
    ├── index.js             # Validation result handler
    ├── blog/
    └── user/                # Sign up and login rules
```
