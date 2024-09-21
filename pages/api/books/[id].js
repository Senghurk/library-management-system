import dbConnect from '../../../lib/db';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const { query: { id }, method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const book = await Book.findById(id).populate('authorId genreId');
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching book' });
      }
      break;

    case 'PUT':
      try {
        const book = await Book.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
      } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
      }
      break;

    case 'DELETE':
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
