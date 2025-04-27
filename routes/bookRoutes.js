const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateUser } = require('../middleware/authMiddleware'); // <-- Import auth middleware

// Route to get all books
router.get('/list', bookController.getAllBooks);
// Route to add a book (only for authenticated users)
router.post('/add', authenticateUser, bookController.addBook);

module.exports = router;