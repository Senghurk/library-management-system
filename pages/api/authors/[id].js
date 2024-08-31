// pages/api/authors/[id].js
import { readData, writeData } from '@/lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const authors = await readData('authors');
        const author = authors.find(a => a.id === id);
        if (author) {
          res.status(200).json(author);
        } else {
          res.status(404).json({ error: 'Author not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch author' });
      }
      break;

    case 'PUT':
      try {
        const authors = await readData('authors');
        const index = authors.findIndex(a => a.id === id);
        if (index !== -1) {
          authors[index] = { ...authors[index], ...req.body };
          await writeData('authors', authors);
          res.status(200).json(authors[index]);
        } else {
          res.status(404).json({ error: 'Author not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to update author' });
      }
      break;

    case 'DELETE':
      try {
        const authors = await readData('authors');
        const filteredAuthors = authors.filter(a => a.id !== id);
        if (authors.length !== filteredAuthors.length) {
          await writeData('authors', filteredAuthors);
          res.status(200).json({ message: 'Author deleted successfully' });
        } else {
          res.status(404).json({ error: 'Author not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete author' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}