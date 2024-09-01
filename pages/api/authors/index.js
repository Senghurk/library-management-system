import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const authors = await kv.get('authors') || [];
        res.status(200).json(authors);
      } catch (error) {
        console.error('Error reading authors data:', error);
        res.status(500).json({ message: 'Error reading authors data' });
      }
      break;

    case 'POST':
      try {
        const authors = await kv.get('authors') || [];
        const newAuthor = {
          id: String(Date.now()), // Using timestamp as ID for uniqueness
          ...req.body
        };
        const updatedAuthors = [...authors, newAuthor];
        await kv.set('authors', updatedAuthors);
        res.status(201).json(newAuthor);
      } catch (error) {
        console.error('Error creating new author:', error);
        res.status(500).json({ message: 'Error creating new author' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}