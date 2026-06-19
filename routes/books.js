const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// @route   GET /api/books
// @desc    Get all books — supports search (?author=&genre=) and pagination (?page=&limit=)
router.get('/', async (req, res, next) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    // Build dynamic filter object for search
    const filter = {};
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };

    const pageNum = Math.max(parseInt(page), 1);
    const limitNum = Math.max(parseInt(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const totalBooks = await Book.countDocuments(filter);
    const books = await Book.find(filter).skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      count: books.length,
      total: totalBooks,
      page: pageNum,
      totalPages: Math.ceil(totalBooks / limitNum),
      data: books,
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/books/:id
// @desc    Get a single book by ID
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/books
// @desc    Add a new book
router.post('/', async (req, res, next) => {
  try {
    const { title, author, price } = req.body;

    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Title, author, and price are required fields',
      });
    }

    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/books/:id
// @desc    Update an existing book by ID
router.put('/:id', async (req, res, next) => {
  try {
    const { title, author, price } = req.body;

    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Title, author, and price are required fields',
      });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
