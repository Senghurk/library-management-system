import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Link from 'next/link';

const EditBook = () => {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [summary, setSummary] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [bookResponse, authorsResponse, genresResponse] = await Promise.all([
          fetch(`/api/books/${id}`),
          fetch('/api/authors'),
          fetch('/api/genres')
        ]);

        if (!bookResponse.ok || !authorsResponse.ok || !genresResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [bookData, authorsData, genresData] = await Promise.all([
          bookResponse.json(),
          authorsResponse.json(),
          genresResponse.json()
        ]);

        setBook(bookData);
        setTitle(bookData.title);
        setAuthorId(bookData.authorId);
        setGenreId(bookData.genreId);
        setPublishedDate(bookData.publishedDate.split('T')[0]);
        setSummary(bookData.summary);
        setAuthors(authorsData);
        setGenres(genresData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
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

  if (!book) return <Layout>Loading book details...</Layout>;

  return (
    <Layout title="Edit Book | Library Management System">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded"
          />
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary"
            className="w-full p-2 border rounded h-32"
          />
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Book
            </button>
            <Link href={`/books/${id}`} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditBook;