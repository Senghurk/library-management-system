import dbConnect from '../../../lib/db';
import Genre from '../../../models/Genre';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const genres = await Genre.find({});
        res.status(200).json(genres);
      } catch (error) {
        console.error('Error reading genres data:', error);
        res.status(500).json({ message: 'Error reading genres data' });
      }
      break;

    case 'POST':
      try {
        const newGenre = await Genre.create(req.body);
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