require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const requestLogger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

// Built-in + body-parser middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());

// Custom request logging middleware
app.use(requestLogger);

// Routes
app.use('/api/books', bookRoutes);

// Simple health check route
app.get('/', (req, res) => {
  res.send('Online Bookstore Management API is running...');
});

// 404 handler for undefined routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Connect to MongoDB, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
