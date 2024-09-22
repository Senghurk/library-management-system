import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksResponse, authorsResponse, genresResponse] = await Promise.all([
          fetch('/api/books'),
          fetch('/api/authors'),
          fetch('/api/genres')
        ]);

        if (!booksResponse.ok) throw new Error('Failed to fetch books');
        if (!authorsResponse.ok) throw new Error('Failed to fetch authors');
        if (!genresResponse.ok) throw new Error('Failed to fetch genres');

        const [booksData, authorsData, genresData] = await Promise.all([
          booksResponse.json(),
          authorsResponse.json(),
          genresResponse.json()
        ]);

        setBooks(booksData.data || []);
        setAuthors(authorsData.data || []);
        setGenres(genresData.data || []);
        
        console.log('Fetched books:', booksData.data);
        console.log('Fetched authors:', authorsData.data);
        console.log('Fetched genres:', genresData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
  
        // Remove the deleted book from the state
        setBooks(books.filter(book => book._id !== id));
      } catch (err) {
        setError('Failed to delete book. Please try again later.');
        console.error('Error deleting book:', err);
      }
    }
  };

  const filteredBooks = books.filter(book => {
    console.log('Filtering book:', book);
    console.log('Book authorId:', book.authorId);
    console.log('Book genreId:', book.genreId);
    console.log('Current filterAuthor:', filterAuthor);
    console.log('Current filterGenre:', filterGenre);
    
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '';
    const matchesAuthor = filterAuthor === '' || book.authorId === filterAuthor || (book.authorId && book.authorId._id === filterAuthor);
    const matchesGenre = filterGenre === '' || book.genreId === filterGenre || (book.genreId && book.genreId._id === filterGenre);
    
    console.log('Matches search:', matchesSearch);
    console.log('Matches author:', matchesAuthor);
    console.log('Matches genre:', matchesGenre);
    
    return matchesSearch && matchesAuthor && matchesGenre;
  });

  console.log('Filtered books:', filteredBooks);

  if (loading) return <div className="text-center py-4"><br/>Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500"><br/>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4"><br/>
      <h1 className="text-3xl font-bold mb-4">Books</h1>
      <Link href="/books/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block">
        Add New Book
      </Link>

      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <select
          value={filterAuthor}
          onChange={(e) => {
            console.log('Selected author value:', e.target.value);
            setFilterAuthor(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Authors</option>
          {authors && authors.map(author => (
            <option key={author._id} value={author._id}>{author.name}</option>
          ))}
        </select>

        <select
          value={filterGenre}
          onChange={(e) => {
            console.log('Selected genre value:', e.target.value);
            setFilterGenre(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Genres</option>
          {genres && genres.map(genre => (
            <option key={genre._id} value={genre._id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map(book => (
          <div key={book._id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p>Author: {book.authorId?.name || authors.find(a => a._id === book.authorId)?.name || 'Unknown'}</p>
            <p>Genre: {book.genreId?.name || genres.find(g => g._id === book.genreId)?.name || 'Unknown'}</p>
            <p>Published: {new Date(book.publishedDate).toLocaleDateString()}</p>
            <div className="mt-4 flex space-x-2">
              <Link href={`/books/${book._id}`} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                View
              </Link>
              <Link href={`/books/${book._id}/edit`} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
                Update
              </Link>
              <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;