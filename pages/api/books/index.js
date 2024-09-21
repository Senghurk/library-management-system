import dbConnect from '../../../lib/db';
import Book from '../../../models/Book';
import Author from '../../../models/Author';
import Genre from '../../../models/Genre';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const books = await Book.find({}).populate('authorId').populate('genreId');
        res.status(200).json({ success: true, data: books });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        console.log('Received book data:', req.body);
        
        // Validate authorId and genreId
        const author = await Author.findById(req.body.authorId);
        const genre = await Genre.findById(req.body.genreId);
        
        if (!author) {
          return res.status(400).json({ success: false, message: 'Invalid author ID' });
        }
        if (!genre) {
          return res.status(400).json({ success: false, message: 'Invalid genre ID' });
        }

        // Create new book
        const newBook = new Book({
          ...req.body,
          authorId: new ObjectId(req.body.authorId),
          genreId: new ObjectId(req.body.genreId),
          publishedDate: new Date(req.body.publishedDate)
        });

        console.log('Created new book object:', newBook);
        
        const savedBook = await newBook.save();
        console.log('Saved book to database:', savedBook);
        
        res.status(201).json({ success: true, data: savedBook });
      } catch (error) {
        console.error('Error creating book:', error);
        res.status(400).json({ success: false, message: 'Error creating book', error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}