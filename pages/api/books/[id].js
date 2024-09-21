import mongoose from 'mongoose';
import Book from '../../../models/Book'; // Import Mongoose Book model

export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  switch (method) {
    case 'GET':
      try {
        const book = await Book.findById(id).populate('authorId').populate('genreId');
        if (book) {
          res.status(200).json(book);
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } catch (error) {
        console.error('Error reading book data:', error);
        res.status(500).json({ message: 'Error reading book data' });
      }
      break;

    case 'PUT':
      try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedBook) {
          res.status(200).json(updatedBook);
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Error updating book' });
      }
      break;

    case 'DELETE':
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
          res.status(200).json({ message: 'Book deleted successfully' });
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Error deleting book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
