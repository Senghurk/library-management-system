// pages/books/add.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useNotification } from '@/contexts/NotificationContext';

export default function AddBook() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [book, setBook] = useState({
    title: '',
    authorId: '',
    genreId: '',
    publishedDate: '',
    summary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        showNotification('Book added successfully', 'success');
        router.push('/books');
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      showNotification('Failed to add book', 'error');
    }
  };

  return (
    <Layout title="Add New Book | Library Management System">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={book.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">Author ID</label>
            <input
              type="text"
              name="authorId"
              id="authorId"
              value={book.authorId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="genreId" className="block text-sm font-medium text-gray-700">Genre ID</label>
            <input
              type="text"
              name="genreId"
              id="genreId"
              value={book.genreId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Published Date</label>
            <input
              type="date"
              name="publishedDate"
              id="publishedDate"
              value={book.publishedDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea
              name="summary"
              id="summary"
              value={book.summary}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}