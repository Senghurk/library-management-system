import { getAllBooks, addBook } from '@/lib/db';

let cachedBooks = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 1 minute in milliseconds

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const currentTime = Date.now();
    if (!cachedBooks || currentTime - lastFetchTime > CACHE_DURATION) {
      cachedBooks = await getAllBooks();
      lastFetchTime = currentTime;
    }
    res.status(200).json(cachedBooks);
  } else if (req.method === 'POST') {
    try {
      const newBook = await addBook(req.body);
      cachedBooks = null; // Invalidate cache
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}