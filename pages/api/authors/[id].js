import dbConnect from '../../../lib/db';
import Author from '../../../models/Author';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const author = await Author.findById(id).lean();
        if (!author) {
          return res.status(404).json({ success: false, message: 'Author not found' });
        }
        const books = await Book.find({ authorId: author._id }).select('title').lean();
        res.status(200).json({ success: true, data: { ...author, books } });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const author = await Author.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!author) {
          return res.status(404).json({ success: false, message: 'Author not found' });
        }
        res.status(200).json({ success: true, data: author });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedAuthor = await Author.deleteOne({ _id: id });
        if (!deletedAuthor) {
          return res.status(404).json({ success: false, message: 'Author not found' });
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