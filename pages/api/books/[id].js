import { getData, updateData, deleteData } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  const bookId = parseInt(id);

  if (req.method === 'GET') {
    try {
      const book = await getData('books', bookId);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedBook = await updateData('books', bookId, req.body);
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating book', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deleted = await deleteData('books', bookId);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}