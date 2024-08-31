import { getAllAuthors, addAuthor } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authors = await getAllAuthors();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch authors' });
    }
  } else if (req.method === 'POST') {
    try {
      const newAuthor = await addAuthor(req.body);
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}