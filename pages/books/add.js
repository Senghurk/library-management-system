import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function AddBook() {
  const [book, setBook] = useState({
    title: '',
    authorId: '',
    genreId: '',
    publishedDate: '',
    summary: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    if (response.ok) {
      router.push('/books');
    } else {
      // Handle error - you might want to show an error message to the user
      console.error('Failed to add book');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
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
            Add Book
          </button>
        </form>
      </div>
    </Layout>
  );
}