import fs from 'fs/promises';
import path from 'path';

const authorsPath = path.join(process.cwd(), 'data', 'authors.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = await fs.readFile(authorsPath, 'utf8');
      let authors = JSON.parse(data);
      const newAuthor = { ...req.body, id: Date.now().toString() };
      authors.push(newAuthor);
      await fs.writeFile(authorsPath, JSON.stringify(authors, null, 2));
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await fs.readFile(authorsPath, 'utf8');
      const authors = JSON.parse(data);
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
