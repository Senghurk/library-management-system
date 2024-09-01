import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [summary, setSummary] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/authors');
      if (!response.ok) throw new Error('Failed to fetch authors');
      const data = await response.json();
      setAuthors(data);
    } catch (err) {
      setError('Failed to load authors. Please try again.');
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/genres');
      if (!response.ok) throw new Error('Failed to fetch genres');
      const data = await response.json();
      setGenres(data);
    } catch (err) {
      setError('Failed to load genres. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
  
    if (!title || !authorId || !genreId || !publishedDate) {
      setError('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, authorId, genreId, publishedDate, summary }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add book');
      }
  
      const newBook = await response.json();
      console.log('New book added:', newBook);
      setSuccess(true);
      setTimeout(() => router.push('/books'), 2000);
    } catch (err) {
      console.error('Error adding book:', err);
      setError(`Failed to add book. ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="w-full p-2 border rounded"
          required
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
          required
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
          required
        />
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          className="w-full p-2 border rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">Book added successfully! Redirecting...</div>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;