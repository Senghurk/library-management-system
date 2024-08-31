import fs from 'fs/promises';
import path from 'path';

const authorsPath = path.join(process.cwd(), 'data', 'authors.json');

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const data = await fs.readFile(authorsPath, 'utf8');
    let authors = JSON.parse(data);

    if (req.method === 'PUT') {
      const index = authors.findIndex(a => a.id === id);
      if (index !== -1) {
        // Log the incoming request body
        console.log('Request body:', req.body);

        // Ensure the request body contains the necessary fields
        if (!req.body.name || !req.body.nationality || !req.body.birthDate) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        authors[index] = { ...authors[index], ...req.body, id };
        await fs.writeFile(authorsPath, JSON.stringify(authors, null, 2));
        res.status(200).json(authors[index]);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Server error:', error.message);  // Log the error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
