import dbConnect from '../../../lib/db';
import Genre from '../../../models/Genre';
import Book from '../../../models/Book';
import { isValidObjectId } from 'mongoose';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  // Check if id is valid before proceeding
  if (!id || !isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'Invalid genre ID' });
  }

  switch (method) {
    case 'GET':
      try {
        const genre = await Genre.findById(id).lean();
        if (!genre) {
          return res.status(404).json({ success: false, message: 'Genre not found' });
        }
        const books = await Book.find({ genreId: genre._id }).select('title').lean();
        res.status(200).json({ success: true, data: { ...genre, books } });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const genre = await Genre.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!genre) {
          return res.status(404).json({ success: false, message: 'Genre not found' });
        }
        res.status(200).json({ success: true, data: genre });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedGenre = await Genre.findByIdAndDelete(id);
        if (!deletedGenre) {
          return res.status(404).json({ success: false, message: 'Genre not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}