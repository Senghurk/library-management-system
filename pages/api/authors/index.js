// pages/api/authors/index.js
import { readData, writeData } from '@/lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const authors = await readData('authors');
        res.status(200).json(authors);
      } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ error: 'Failed to fetch authors' });
      }
      break;

    case 'POST':
      try {
        const authors = await readData('authors');
        const newAuthor = {
          id: Date.now().toString(),
          ...req.body
        };
        authors.push(newAuthor);
        await writeData('authors', authors);
        res.status(201).json(newAuthor);
      } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ error: 'Failed to create author' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}