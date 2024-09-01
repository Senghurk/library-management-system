import { readData, updateData, deleteData } from '../../../lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const authors = await readData('authors.json');
        const author = authors.find(a => a.id === id);
        if (author) {
          res.status(200).json(author);
        } else {
          res.status(404).json({ message: 'Author not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error reading author data' });
      }
      break;

    case 'PUT':
      try {
        const updatedAuthor = await updateData('authors.json', id, req.body);
        if (updatedAuthor) {
          res.status(200).json(updatedAuthor);
        } else {
          res.status(404).json({ message: 'Author not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating author' });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await deleteData('authors.json', id);
        if (deleted) {
          res.status(200).json({ message: 'Author deleted successfully' });
        } else {
          res.status(404).json({ message: 'Author not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting author' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}