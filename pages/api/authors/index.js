import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const authorsPath = path.join(process.cwd(), 'data', 'authors.json');

  try {
    const data = await fs.readFile(authorsPath, 'utf8');
    let authors = JSON.parse(data);

    if (req.method === 'GET') {
      res.status(200).json(authors);
    } else if (req.method === 'POST') {
      const newAuthor = req.body;
      authors.push(newAuthor);
      await fs.writeFile(authorsPath, JSON.stringify(authors, null, 2));
      res.status(201).json(newAuthor);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
