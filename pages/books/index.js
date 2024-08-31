import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import BookList from '../../components/books/BookList';
import Link from 'next/link';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);

  return (
    <Layout title="Books | Library Management System">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Books</h1>
          <Link href="/books/add" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Add New Book
          </Link>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading books...</p>
        ) : (
          <BookList books={books} />
        )}
      </div>
    </Layout>
  );
}