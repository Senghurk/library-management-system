import { getData, updateData, deleteData } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  const authorId = parseInt(id);

  if (req.method === 'GET') {
    try {
      const author = await getData('authors', authorId);
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching author', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedAuthor = await updateData('authors', authorId, req.body);
      if (updatedAuthor) {
        res.status(200).json(updatedAuthor);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating author', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deleted = await deleteData('authors', authorId);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting author', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}