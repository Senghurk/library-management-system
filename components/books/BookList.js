import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BookList = () => {
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
      try {
        const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setBooks(books.filter(book => book.id !== id));
        } else {
          console.error('Failed to delete the book');
        }
      } catch (error) {
        console.error('Error deleting the book:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <Link href="/books/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add New Book
      </Link>
      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.id} className="border p-4 mb-2 flex justify-between items-center">
            <span>{book.title} by {book.author}</span>
            <div>
              <Link href={`/books/${book.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                View
              </Link>
              <button
                onClick={() => router.push(`/books/${book.id}/edit`)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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