import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNotification } from '@/contexts/NotificationContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
        showNotification('Book deleted successfully', 'success');
        fetchBooks(); // Refresh the list
      } catch (err) {
        showNotification(err.message, 'error');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div className="text-center mt-8">No books found. Add some books to get started!</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <Link href="/books/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add New Book
      </Link>
      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.id} className="border p-4 mb-2 flex justify-between items-center">
            <span>{book.title} by {book.author || book.authorId || 'Unknown Author'}</span>
            <div>
              <Link href={`/books/${book.id}`} className="text-blue-500 hover:underline mr-2">
                View
              </Link>
              <Link href={`/books/${book.id}/edit`} className="text-green-500 hover:underline mr-2">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;