// pages/api/books/index.js
import { readData, writeData } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const books = await readData('books');
    res.status(200).json(books);
  } else if (req.method === 'POST') {
    const newBook = req.body;
    const books = await readData('books');
    newBook.id = String(books.length + 1);
    books.push(newBook);
    await writeData('books', books);
    res.status(201).json(newBook);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}