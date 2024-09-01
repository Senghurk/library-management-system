import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const genres = await kv.get('genres') || [];
        const genre = genres.find(g => g.id === id);
        if (genre) {
          res.status(200).json(genre);
        } else {
          res.status(404).json({ message: 'Genre not found' });
        }
      } catch (error) {
        console.error('Error reading genre data:', error);
        res.status(500).json({ message: 'Error reading genre data' });
      }
      break;

    case 'PUT':
      try {
        const genres = await kv.get('genres') || [];
        const index = genres.findIndex(g => g.id === id);
        if (index !== -1) {
          genres[index] = { ...genres[index], ...req.body, id };
          await kv.set('genres', genres);
          res.status(200).json(genres[index]);
        } else {
          res.status(404).json({ message: 'Genre not found' });
        }
      } catch (error) {
        console.error('Error updating genre:', error);
        res.status(500).json({ message: 'Error updating genre' });
      }
      break;

    case 'DELETE':
      try {
        const genres = await kv.get('genres') || [];
        const filteredGenres = genres.filter(g => g.id !== id);
        if (genres.length !== filteredGenres.length) {
          await kv.set('genres', filteredGenres);
          res.status(200).json({ message: 'Genre deleted successfully' });
        } else {
          res.status(404).json({ message: 'Genre not found' });
        }
      } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ message: 'Error deleting genre' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}