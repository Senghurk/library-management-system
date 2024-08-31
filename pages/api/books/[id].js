import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;
  const dataFilePath = path.join(process.cwd(), 'data', 'books.json');

  try {
    const data = await readFile(dataFilePath, 'utf8');
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
        await writeFile(dataFilePath, JSON.stringify(books, null, 2));
        res.status(200).json(books[index]);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } else if (req.method === 'DELETE') {
      const initialLength = books.length;
      books = books.filter(b => b.id !== id);
      if (books.length < initialLength) {
        await writeFile(dataFilePath, JSON.stringify(books, null, 2));
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in book API route:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}