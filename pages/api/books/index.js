import dbConnect from '../../../lib/db';
import Book from '../../../models/Book';
import Author from '../../../models/Author';
import Genre from '../../../models/Genre';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        let books = await Book.find().populate('authorId genreId');

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
          books = books.filter(book => book.authorId._id.equals(query.author));
        }

        // Genre filter
        if (query.genre) {
          books = books.filter(book => book.genreId._id.equals(query.genre));
        }

        res.status(200).json(books);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
      }
      break;

    case 'POST':
      try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
      } catch (error) {
        res.status(500).json({ message: 'Error creating book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
