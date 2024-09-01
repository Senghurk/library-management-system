// components/books/BookForm.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@/contexts/NotificationContext';

export const BookForm = ({ book }) => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    authorId: '',
    genreId: '',
    publishedDate: '',
    summary: '',
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = book ? `/api/books/${book.id}` : '/api/books';
    const method = book ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save book');
      }

      showNotification('Book saved successfully', 'success');
      router.push('/books');
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">Author ID</label>
        <input
          type="text"
          id="authorId"
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="genreId" className="block text-sm font-medium text-gray-700">Genre ID</label>
        <input
          type="text"
          id="genreId"
          name="genreId"
          value={formData.genreId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Published Date</label>
        <input
          type="date"
          id="publishedDate"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {book ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};