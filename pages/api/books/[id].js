// pages/api/books/[id].js
import fs from 'fs/promises';
import path from 'path';

const booksPath = path.join(process.cwd(), 'data', 'books.json');

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const data = await fs.readFile(booksPath, 'utf8');
    let books = JSON.parse(data);

    if (req.method === 'GET') {
      const book = books.find(b => b.id === id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } else if (req.method === 'PUT') {
      const index = books.findIndex(b => b.id === id);
      if (index !== -1) {
        books[index] = { ...books[index], ...req.body, id };
        await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
        res.status(200).json(books[index]);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } else if (req.method === 'DELETE') {
      books = books.filter(b => b.id !== id);
      await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}