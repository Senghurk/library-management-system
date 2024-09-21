import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BookForm = ({ book }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    authorId: '',
    genreId: '',
    publishedDate: '',
    summary: ''
  });
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        authorId: book.authorId?._id || book.authorId || '',
        genreId: book.genreId?._id || book.genreId || '',
        publishedDate: book.publishedDate ? new Date(book.publishedDate).toISOString().split('T')[0] : '',
        summary: book.summary || ''
      });
    }
    fetchAuthorsAndGenres();
  }, [book]);

  const fetchAuthorsAndGenres = async () => {
    try {
      setLoading(true);
      const [authorsRes, genresRes] = await Promise.all([
        fetch('/api/authors'),
        fetch('/api/genres')
      ]);
      const authorsData = await authorsRes.json();
      const genresData = await genresRes.json();
      
      console.log('Authors data:', authorsData);
      console.log('Genres data:', genresData);

      if (authorsData.success && Array.isArray(authorsData.data)) {
        setAuthors(authorsData.data);
      } else {
        console.error('Invalid authors data format:', authorsData);
        setError('Failed to load authors. Please try again.');
      }

      if (genresData.success && Array.isArray(genresData.data)) {
        setGenres(genresData.data);
      } else {
        console.error('Invalid genres data format:', genresData);
        setError('Failed to load genres. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching authors and genres:', error);
      setError('Failed to load authors and genres. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = book ? `/api/books/${book._id}` : '/api/books';
    const method = book ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        console.log(book ? 'Book updated successfully:' : 'Book created successfully:', data.data);
        router.push('/books');
      } else {
        console.error(book ? 'Failed to update book:' : 'Failed to create book:', data.message);
        setError(data.message || 'An error occurred while saving the book.');
      }
    } catch (error) {
      console.error(book ? 'Error updating book:' : 'Error creating book:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) return <div>Loading authors and genres...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="authorId" className="block mb-2">Author</label>
        <select
          id="authorId"
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select Author</option>
          {authors.map(author => (
            <option key={author._id} value={author._id}>{author.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="genreId" className="block mb-2">Genre</label>
        <select
          id="genreId"
          name="genreId"
          value={formData.genreId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select Genre</option>
          {genres.map(genre => (
            <option key={genre._id} value={genre._id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="publishedDate" className="block mb-2">Published Date</label>
        <input
          type="date"
          id="publishedDate"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="summary" className="block mb-2">Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          rows="4"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        {book ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;