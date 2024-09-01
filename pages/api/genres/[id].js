import { readData, updateData, deleteData } from '../../../lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const genres = await readData('genres.json');
        const genre = genres.find(g => g.id === id);
        if (genre) {
          res.status(200).json(genre);
        } else {
          res.status(404).json({ message: 'Genre not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error reading genre data' });
      }
      break;

    case 'PUT':
      try {
        const updatedGenre = await updateData('genres.json', id, req.body);
        if (updatedGenre) {
          res.status(200).json(updatedGenre);
        } else {
          res.status(404).json({ message: 'Genre not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating genre' });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await deleteData('genres.json', id);
        if (deleted) {
          res.status(200).json({ message: 'Genre deleted successfully' });
        } else {
          res.status(404).json({ message: 'Genre not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting genre' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}