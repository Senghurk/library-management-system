import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, selectedAuthor, selectedGenre]);

  const fetchBooks = async () => {
    setIsLoading(true);
    let url = '/api/books?';
    if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
    if (selectedAuthor) url += `author=${selectedAuthor}&`;
    if (selectedGenre) url += `genre=${selectedGenre}&`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to load books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/authors');
      if (!response.ok) throw new Error('Failed to fetch authors');
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
      alert('Failed to load authors. Please try again.');
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/genres');
      if (!response.ok) throw new Error('Failed to fetch genres');
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
      alert('Failed to load genres. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete book');
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <Link href="/books/add" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add New Book
      </Link>

      <div className="my-4 space-y-2">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : books.length === 0 ? (
        <div className="text-center">No books found.</div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">Author: {book.authorName || 'Unknown'}</p>
              <p className="text-gray-600">Genre: {book.genreName || 'Unknown'}</p>
              <p className="text-gray-600">Published: {book.publishedDate}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => router.push(`/books/${book.id}`)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/books/${book.id}/edit`)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;