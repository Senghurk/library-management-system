// pages/books/[id]/edit.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function EditBook() {
  const [book, setBook] = useState({
    title: '',
    authorId: '',
    genreId: '',
    publishedDate: '',
    summary: ''
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    const response = await fetch(`/api/books/${id}`);
    const data = await response.json();
    setBook(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    if (response.ok) {
      router.push('/books');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="authorId" className="block mb-2">Author ID</label>
            <input
              type="text"
              id="authorId"
              name="authorId"
              value={book.authorId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genreId" className="block mb-2">Genre ID</label>
            <input
              type="text"
              id="genreId"
              name="genreId"
              value={book.genreId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publishedDate" className="block mb-2">Published Date</label>
            <input
              type="date"
              id="publishedDate"
              name="publishedDate"
              value={book.publishedDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="block mb-2">Summary</label>
            <textarea
              id="summary"
              name="summary"
              value={book.summary}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Book
          </button>
        </form>
      </div>
    </Layout>
  );
}