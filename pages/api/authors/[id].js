import fs from 'fs/promises';
import path from 'path';

const authorsPath = path.join(process.cwd(), 'data', 'authors.json');

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const data = await fs.readFile(authorsPath, 'utf8');
    let authors = JSON.parse(data);

    if (req.method === 'GET') {
      const author = authors.find(a => a.id === id);
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } else if (req.method === 'PUT') {
      const index = authors.findIndex(a => a.id === id);
      if (index !== -1) {
        authors[index] = { ...authors[index], ...req.body, id };
        await fs.writeFile(authorsPath, JSON.stringify(authors, null, 2));
        res.status(200).json(authors[index]);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } else if (req.method === 'DELETE') {
      authors = authors.filter(a => a.id !== id);
      await fs.writeFile(authorsPath, JSON.stringify(authors, null, 2));
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}