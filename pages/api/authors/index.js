import { readData, writeData } from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const authors = await readData('authors.json');
        res.status(200).json(authors);
      } catch (error) {
        res.status(500).json({ message: 'Error reading authors data' });
      }
      break;

    case 'POST':
      try {
        const authors = await readData('authors.json');
        const newAuthor = {
          id: String(authors.length + 1),
          ...req.body
        };
        authors.push(newAuthor);
        await writeData('authors.json', authors);
        res.status(201).json(newAuthor);
      } catch (error) {
        res.status(500).json({ message: 'Error creating new author' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}