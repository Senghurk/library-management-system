import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNotification } from '@/contexts/NotificationContext';

const BookList = ({ initialBooks }) => {
  const [books, setBooks] = useState(initialBooks || []);
  const [loading, setLoading] = useState(!initialBooks);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { showNotification } = useNotification();

  const fetchBooks = useCallback(async () => {
    if (initialBooks) return;
    try {
      setLoading(true);
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification, initialBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const previousBooks = [...books];
      setBooks(books.filter(book => book.id !== id));
      
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
        showNotification('Book deleted successfully', 'success');
      } catch (err) {
        setBooks(previousBooks);
        showNotification(err.message, 'error');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-xl">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-xl text-red-500">Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div className="text-center mt-8 text-xl">No books found. Add some books to get started!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book List</h1>
      <Link href="/books/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Book
      </Link>
      <ul className="mt-6 space-y-4">
        {books.map((book) => (
          <li key={book.id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <span className="text-lg">{book.title} by {book.author || book.authorId || 'Unknown Author'}</span>
            <div className="space-x-2">
              <Link href={`/books/${book.id}`} className="text-blue-500 hover:text-blue-700">
                View
              </Link>
              <Link href={`/books/${book.id}/edit`} className="text-green-500 hover:text-green-700">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book.id)}
                className="text-red-500 hover:text-red-700"
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