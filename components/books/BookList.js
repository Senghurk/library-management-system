// components/books/BookList.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch('/api/books');
    const data = await response.json();
    setBooks(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      fetchBooks();
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <Link href="/books/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Book
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p>Author ID: {book.authorId}</p>
            <p>Genre ID: {book.genreId}</p>
            <p>Published: {book.publishedDate}</p>
            <div className="mt-4">
              <button
                onClick={() => router.push(`/books/${book.id}`)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/books/${book.id}/edit`)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
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
    </div>
  );
}