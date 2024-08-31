import { getData, addData } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const books = await getData('books');
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const newBook = req.body;
      const addedBook = await addData('books', newBook);
      res.status(201).json(addedBook);
    } catch (error) {
      res.status(500).json({ message: 'Error adding book', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}