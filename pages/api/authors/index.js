import { getData, addData } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authors = await getData('authors');
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching authors', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const newAuthor = req.body;
      const addedAuthor = await addData('authors', newAuthor);
      res.status(201).json(addedAuthor);
    } catch (error) {
      res.status(500).json({ message: 'Error adding author', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}