import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const genres = await kv.get('genres') || [];
        res.status(200).json(genres);
      } catch (error) {
        console.error('Error reading genres data:', error);
        res.status(500).json({ message: 'Error reading genres data' });
      }
      break;

    case 'POST':
      try {
        const genres = await kv.get('genres') || [];
        const newGenre = {
          id: String(Date.now()), // Using timestamp as ID for uniqueness
          ...req.body
        };
        const updatedGenres = [...genres, newGenre];
        await kv.set('genres', updatedGenres);
        res.status(201).json(newGenre);
      } catch (error) {
        console.error('Error creating new genre:', error);
        res.status(500).json({ message: 'Error creating new genre' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}