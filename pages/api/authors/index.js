import dbConnect from '../../../lib/db';
import Author from '../../../models/Author';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const authors = await Author.find({}).lean();
        
        // Fetch books for each author
        const authorsWithBooks = await Promise.all(authors.map(async (author) => {
          const books = await Book.find({ authorId: author._id }).select('title').lean();
          return { ...author, books };
        }));

        res.status(200).json({ success: true, data: authorsWithBooks });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const author = await Author.create(req.body);
        res.status(201).json({ success: true, data: author });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}