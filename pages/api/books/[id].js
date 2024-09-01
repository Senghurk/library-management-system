import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const books = await kv.get('books') || [];
        const book = books.find(b => b.id === id);
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
        const books = await kv.get('books') || [];
        const index = books.findIndex(b => b.id === id);
        if (index !== -1) {
          books[index] = { ...books[index], ...req.body, id };
          await kv.set('books', books);
          res.status(200).json(books[index]);
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
        const books = await kv.get('books') || [];
        const filteredBooks = books.filter(b => b.id !== id);
        if (books.length !== filteredBooks.length) {
          await kv.set('books', filteredBooks);
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