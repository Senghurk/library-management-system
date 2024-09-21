import dbConnect from '../../../lib/db';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Book ID is required' });
        }
        const book = await Book.findById(id).populate('authorId genreId');
        if (!book) {
          return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
      } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ success: false, message: 'Error fetching book', error: error.message });
      }
      break;

    case 'PUT':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Book ID is required' });
        }
        const book = await Book.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        }).populate('authorId genreId');
        if (!book) {
          return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
      } catch (error) {
        console.error('Error updating book:', error);
        res.status(400).json({ success: false, message: 'Error updating book', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Book ID is required' });
        }
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
          return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting book:', error);
        res.status(400).json({ success: false, message: 'Error deleting book', error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}