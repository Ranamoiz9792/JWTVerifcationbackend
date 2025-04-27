const { bookSchema } = require('../validators/bookValidator'); // Import schema
const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    // Validate request body
    const validatedData = bookSchema.parse(req.body);

    // Save book to database
    const newBook = new Book(validatedData);
    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    if (error instanceof bookSchema.constructor) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
