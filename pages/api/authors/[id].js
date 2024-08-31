import { getAuthorById, updateAuthor, deleteAuthor } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const author = await getAuthorById(id);
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } else if (req.method === 'PUT') {
      const updatedAuthor = await updateAuthor(id, req.body);
      res.status(200).json(updatedAuthor);
    } else if (req.method === 'DELETE') {
      await deleteAuthor(id);
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in API route:', error);
    if (error.message === 'Author not found') {
      res.status(404).json({ message: 'Author not found' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}