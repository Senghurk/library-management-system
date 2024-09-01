import { readData, writeData } from '../../../lib/db';

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const books = await readData('books');
        const authors = await readData('authors');
        const genres = await readData('genres');

        let filteredBooks = books;

        // Search functionality
        if (query.search) {
          const searchTerm = query.search.toLowerCase();
          filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            authors.find(author => author.id === book.authorId)?.name.toLowerCase().includes(searchTerm)
          );
        }

        // Author filter
        if (query.author) {
          filteredBooks = filteredBooks.filter(book => book.authorId === query.author);
        }

        // Genre filter
        if (query.genre) {
          filteredBooks = filteredBooks.filter(book => book.genreId === query.genre);
        }

        // Add author and genre names to the book objects
        const enrichedBooks = filteredBooks.map(book => ({
          ...book,
          authorName: authors.find(author => author.id === book.authorId)?.name,
          genreName: genres.find(genre => genre.id === book.genreId)?.name
        }));

        res.status(200).json(enrichedBooks);
      } catch (error) {
        res.status(500).json({ message: 'Error reading books data' });
      }
      break;

    case 'POST':
      try {
        const books = await readData('books');
        const newBook = {
          id: String(books.length + 1),
          ...req.body
        };
        books.push(newBook);
        await writeData('books', books);
        res.status(201).json(newBook);
      } catch (error) {
        res.status(500).json({ message: 'Error creating new book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}