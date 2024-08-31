// pages/api/books/index.js
import fs from 'fs/promises';
import path from 'path';

const booksPath = path.join(process.cwd(), 'data', 'books.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(booksPath, 'utf8');
      const books = JSON.parse(data);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch books' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await fs.readFile(booksPath, 'utf8');
      const books = JSON.parse(data);
      const newBook = { ...req.body, id: Date.now().toString() };
      books.push(newBook);
      await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add book' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}