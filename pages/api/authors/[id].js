import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const authors = await kv.get('authors') || [];
        const author = authors.find(a => a.id === id);
        if (author) {
          res.status(200).json(author);
        } else {
          res.status(404).json({ message: 'Author not found' });
        }
      } catch (error) {
        console.error('Error reading author data:', error);
        res.status(500).json({ message: 'Error reading author data' });
      }
      break;

    case 'PUT':
      try {
        const authors = await kv.get('authors') || [];
        const index = authors.findIndex(a => a.id === id);
        if (index !== -1) {
          authors[index] = { ...authors[index], ...req.body, id };
          await kv.set('authors', authors);
          res.status(200).json(authors[index]);
        } else {
          res.status(404).json({ message: 'Author not found' });
        }
      } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ message: 'Error updating author' });
      }
      break;

    case 'DELETE':
      try {
        const authors = await kv.get('authors') || [];
        const filteredAuthors = authors.filter(a => a.id !== id);
        if (authors.length !== filteredAuthors.length) {
          await kv.set('authors', filteredAuthors);
          res.status(200).json({ message: 'Author deleted successfully' });
        } else {
          res.status(404).json({ message: 'Author not found' });
        }
      } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ message: 'Error deleting author' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}