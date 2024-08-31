import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BookForm = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book?.title || '');
  const [authorId, setAuthorId] = useState(book?.authorId || '');
  const [genreId, setGenreId] = useState(book?.genreId || '');
  const [publishedDate, setPublishedDate] = useState(book?.publishedDate || '');
  const [summary, setSummary] = useState(book?.summary || '');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthorsAndGenres = async () => {
      const authorsRes = await fetch('/api/authors');
      const genresRes = await fetch('/api/genres');
      const authorsData = await authorsRes.json();
      const genresData = await genresRes.json();
      setAuthors(authorsData);
      setGenres(genresData);
    };
    fetchAuthorsAndGenres();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, authorId, genreId, publishedDate, summary });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">Author</label>
        <select
          id="authorId"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="genreId" className="block text-sm font-medium text-gray-700">Genre</label>
        <select
          id="genreId"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Published Date</label>
        <input
          type="date"
          id="publishedDate"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {book ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;