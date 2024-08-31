import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  // Add this line at the beginning of the handler
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const { id } = req.query;
  const dataFilePath = path.join(process.cwd(), 'data', 'books.json');

  console.log('API Route Handler - Method:', req.method, 'ID:', id);

  try {
    const data = await readFile(dataFilePath, 'utf8');
    let books = JSON.parse(data);

    if (req.method === 'GET') {
      if (id) {
        const book = books.find(b => b.id.toString() === id);
        if (book) {
          res.status(200).json(book);
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } else {
        res.status(200).json(books);
      }
    } else if (req.method === 'POST') {
      const newBook = {
        id: (Math.max(...books.map(b => parseInt(b.id))) + 1).toString(),
        title: req.body.title,
        authorId: req.body.authorId,
        genreId: req.body.genreId,
        publishedDate: req.body.publishedDate,
        summary: req.body.summary
      };
      books.push(newBook);
      await writeFile(dataFilePath, JSON.stringify(books, null, 2));
      res.status(201).json(newBook);
    } else if (req.method === 'PUT') {
      const index = books.findIndex(b => b.id.toString() === id);
      if (index !== -1) {
        books[index] = { ...books[index], ...req.body, id: books[index].id };
        await writeFile(dataFilePath, JSON.stringify(books, null, 2));
        res.status(200).json(books[index]);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } else if (req.method === 'DELETE') {
      console.log('Attempting to delete book with ID:', id);
      const initialLength = books.length;
      books = books.filter(b => b.id.toString() !== id);
      console.log('Books after filter:', books.length);
      if (books.length < initialLength) {
        console.log('Book found and removed, updating JSON file');
        await writeFile(dataFilePath, JSON.stringify(books, null, 2));
        console.log('JSON file updated successfully');
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        console.log('Book not found for deletion');
        res.status(404).json({ message: 'Book not found' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in book API route:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}