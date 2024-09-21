import mongoose from 'mongoose';
import Book from '../../../models/Book'; // Import Mongoose Book model
import Author from '../../../models/Author'; // Import Mongoose Author model
import Genre from '../../../models/Genre'; // Import Mongoose Genre model

export default async function handler(req, res) {
  const { method, query } = req;

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  switch (method) {
    case 'GET':
      try {
        // Get all books and populate authorId and genreId
        let books = await Book.find()
          .populate('authorId')
          .populate('genreId');

        // Search functionality
        if (query.search) {
          const searchTerm = query.search.toLowerCase();
          books = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.authorId.name.toLowerCase().includes(searchTerm)
          );
        }

        // Author filter
        if (query.author) {
          books = books.filter(book => String(book.authorId._id) === query.author);
        }

        // Genre filter
        if (query.genre) {
          books = books.filter(book => String(book.genreId._id) === query.genre);
        }

        res.status(200).json(books);
      } catch (error) {
        console.error('Error reading books data:', error);
        res.status(500).json({ message: 'Error reading books data' });
      }
      break;

    case 'POST':
      try {
        const newBook = new Book(req.body); // Create new book from the request body
        await newBook.save();
        res.status(201).json(newBook);
      } catch (error) {
        console.error('Error creating new book:', error);
        res.status(500).json({ message: 'Error creating new book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
