const Book = require('../models/Book');
const { z } = require('zod');

// Updated Zod schema
const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    publishedYear: z.number().int().min(1000, "Published Year must be a valid year")
  });
  
  exports.addBook = async (req, res) => {
    try {
      // Validate request body
      const validatedData = bookSchema.parse(req.body);
  
      // Save book to database
      const newBook = new Book(validatedData);
      await newBook.save();
  
      res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Server Error' });
    }
  };