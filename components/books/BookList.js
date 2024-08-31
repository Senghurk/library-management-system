import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [deletePrompt, setDeletePrompt] = useState({ show: false, bookId: null, bookTitle: '' });
  const [error, setError] = useState(null);
  const router = useRouter();

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
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books. Please try again later.');
    }
  };

  const showDeletePrompt = (id, title) => {
    setDeletePrompt({ show: true, bookId: id, bookTitle: title });
  };

  const hideDeletePrompt = () => {
    setDeletePrompt({ show: false, bookId: null, bookTitle: '' });
  };

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete book with ID:', deletePrompt.bookId);
      const response = await fetch(`/api/books/${deletePrompt.bookId}`, { method: 'DELETE' });
      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the book');
      }
      
      const result = await response.json();
      console.log('Delete operation result:', result);
      
      setBooks(books.filter(book => book.id.toString() !== deletePrompt.bookId.toString()));
      hideDeletePrompt();
    } catch (error) {
      console.error('Error deleting the book:', error);
      setError(`Failed to delete the book: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <Link href="/books/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add New Book
      </Link>
      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.id} className="border p-4 mb-2 flex justify-between items-center">
            <span>{book.title} by {book.author || 'Unknown Author'}</span>
            <div>
              <Link href={`/books/${book.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                View
              </Link>
              <Link href={`/books/${book.id}/edit`} className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600">
                Update
              </Link>
              <button
                onClick={() => showDeletePrompt(book.id, book.title)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deletePrompt.show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Confirmation</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete the book "{deletePrompt.bookTitle}"?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 hover:bg-gray-600"
                  onClick={hideDeletePrompt}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;