import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditBook = () => {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        setBook(data);
        setTitle(data.title);
        setAuthorId(data.authorId);
        setGenreId(data.genreId);
        setPublishedDate(data.publishedDate);
        setSummary(data.summary);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, authorId, genreId, publishedDate, summary }),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      router.push(`/books/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!book) return <div className="text-center mt-8 text-xl">Loading book details...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          placeholder="Author ID"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          placeholder="Genre ID"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          placeholder="Published Date"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          className="w-full p-2 border rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;