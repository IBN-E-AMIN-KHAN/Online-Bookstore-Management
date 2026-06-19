// Handles invalid routes (404) — used after all routes are mounted
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler — catches errors from routes, DB, and notFound above
const errorHandler = (err, req, res, next) => {
  // If status was already set (e.g. 404), keep it; otherwise default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Mongoose invalid ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = { notFound, errorHandler };
