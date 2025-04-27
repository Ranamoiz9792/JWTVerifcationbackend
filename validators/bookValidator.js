const { z } = require('zod');

// Book ka schema yahan define karein
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  publishedYear: z.number().int().min(1000, "Published Year must be a valid year")
});

// Schema ko export kar dein
module.exports = {
  bookSchema,
};
