# Online Bookstore Management API — Documentation

Base URL (local): `http://localhost:5000/api/books`

## 1. Get All Books
**GET** `/api/books`

Optional query params:
- `author` — filter by author (case-insensitive partial match)
- `genre` — filter by genre (case-insensitive partial match)
- `page` — page number (default 1)
- `limit` — results per page (default 10)

Example: `GET /api/books?author=rowling&genre=fantasy&page=1&limit=5`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "total": 2,
  "page": 1,
  "totalPages": 1,
  "data": [ { "_id": "...", "title": "...", "author": "...", "price": 12.99, "inStock": true } ]
}
```

## 2. Get Single Book
**GET** `/api/books/:id`

**Response (200):** `{ "success": true, "data": { ...book } }`
**Response (404):** `{ "success": false, "error": "Book not found" }`

## 3. Add New Book
**POST** `/api/books`

**Body (JSON):**
```json
{
  "title": "Harry Potter and the Sorcerer's Stone",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "price": 12.99,
  "publishedDate": "1997-06-26",
  "inStock": true
}
```
**Response (201):** `{ "success": true, "data": { ...createdBook } }`
**Response (400):** missing required field (title, author, or price)

## 4. Update Book
**PUT** `/api/books/:id`

**Body:** same shape as POST (title, author, price required)

**Response (200):** `{ "success": true, "data": { ...updatedBook } }`
**Response (404):** book not found
**Response (400):** missing required field

## 5. Delete Book
**DELETE** `/api/books/:id`

**Response (200):** `{ "success": true, "data": {} }`
**Response (404):** book not found

## Status Codes Used
| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Resource created |
| 400  | Bad request (validation failure) |
| 404  | Resource / route not found |
| 500  | Server error |

## Testing With Postman / Thunder Client
1. Import the routes above as a new collection (or use Thunder Client's "cURL import" with the examples below).
2. Set `Content-Type: application/json` header on POST/PUT requests.
3. Sample cURL:
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","genre":"Dystopian","price":9.99}'
```
