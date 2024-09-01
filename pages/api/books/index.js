import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const books = await kv.get('books') || [];
        const authors = await kv.get('authors') || [];
        const genres = await kv.get('genres') || [];

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
        console.error('Error reading books data:', error);
        res.status(500).json({ message: 'Error reading books data' });
      }
      break;

    case 'POST':
      try {
        const books = await kv.get('books') || [];
        const newBook = {
          id: String(Date.now()), // Using timestamp as ID for uniqueness
          ...req.body
        };
        const updatedBooks = [...books, newBook];
        await kv.set('books', updatedBooks);
        res.status(201).json(newBook);
      } catch (error) {
        console.error('Error creating new book:', error);
        res.status(500).json({ message: 'Error creating new book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}