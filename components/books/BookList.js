import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const BookList = ({ initialBooks = [] }) => {
  const [books, setBooks] = useState(initialBooks);
  const [authors, setAuthors] = useState({});
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(!initialBooks.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!initialBooks.length) {
          const booksRes = await fetch('/api/books');
          const booksData = await booksRes.json();
          setBooks(booksData);
        }

        const authorsRes = await fetch('/api/authors');
        const genresRes = await fetch('/api/genres');
        const authorsData = await authorsRes.json();
        const genresData = await genresRes.json();
        
        const authorsMap = authorsData.reduce((acc, author) => {
          acc[author.id] = author.name;
          return acc;
        }, {});
        
        const genresMap = genresData.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setAuthors(authorsMap);
        setGenres(genresMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialBooks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!books || books.length === 0) {
    return <div>No books found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <Link href="/books/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Add New Book
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {authors[book.authorId] || 'Unknown'}</p>
            <p className="text-sm text-gray-600">Genre: {genres[book.genreId] || 'Unknown'}</p>
            <p className="text-sm text-gray-600">Published: {new Date(book.publishedDate).toLocaleDateString()}</p>
            <div className="mt-4">
              <Link href={`/books/${book.id}`} className="text-indigo-600 hover:text-indigo-800 mr-2">
                View
              </Link>
              <Link href={`/books/${book.id}/edit`} className="text-indigo-600 hover:text-indigo-800">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;