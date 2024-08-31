import { getData, updateData, deleteData } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  const bookId = parseInt(id);

  if (req.method === 'GET') {
    const book = await getData('books', bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } else if (req.method === 'PUT') {
    const updatedBook = await updateData('books', bookId, req.body);
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } else if (req.method === 'DELETE') {
    const deleted = await deleteData('books', bookId);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}