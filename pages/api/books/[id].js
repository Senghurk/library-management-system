import { readData, updateData, deleteData } from '../../../lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const books = await readData('books.json');
        const book = books.find(b => b.id === id);
        if (book) {
          res.status(200).json(book);
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error reading book data' });
      }
      break;

    case 'PUT':
      try {
        const updatedBook = await updateData('books.json', id, req.body);
        if (updatedBook) {
          res.status(200).json(updatedBook);
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await deleteData('books.json', id);
        if (deleted) {
          res.status(200).json({ message: 'Book deleted successfully' });
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}