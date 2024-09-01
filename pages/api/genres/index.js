import { readData, writeData } from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const genres = await readData('genres.json');
        res.status(200).json(genres);
      } catch (error) {
        res.status(500).json({ message: 'Error reading genres data' });
      }
      break;

    case 'POST':
      try {
        const genres = await readData('genres.json');
        const newGenre = {
          id: String(genres.length + 1),
          ...req.body
        };
        genres.push(newGenre);
        await writeData('genres.json', genres);
        res.status(201).json(newGenre);
      } catch (error) {
        res.status(500).json({ message: 'Error creating new genre' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}