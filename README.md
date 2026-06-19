# Online Bookstore Management API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing books in an online bookstore (CS 224 — Web Technologies, Assignment No. 02).

## Features
- Full CRUD for books (Create, Read, Update, Delete)
- MongoDB schema validation (Mongoose)
- Search by `author` and `genre`
- Pagination on the books list
- Request logging middleware
- Centralized error handling with proper HTTP status codes

## Project Structure
```
bookstore-api/
├── models/
│   └── Book.js
├── routes/
│   └── books.js
├── middleware/
│   ├── logger.js
│   └── errorHandler.js
├── server.js
├── package.json
├── .env.example
└── API_DOCUMENTATION.md
```

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Copy `.env.example` to `.env` and set your MongoDB connection string:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/bookstore
   ```
   (Or use a MongoDB Atlas connection string for the cloud.)

3. **Run the server**
   ```bash
   npm run dev    # with nodemon (auto-restart)
   # or
   npm start
   ```

4. The API will be available at `http://localhost:5000/api/books`

See `API_DOCUMENTATION.md` for full endpoint details and example requests.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- body-parser
