import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="text-center mt-8 text-xl">Loading book details...</div>;
  if (error) return <div className="text-center mt-8 text-xl text-red-500">Error: {error}</div>;
  if (!book) return <div className="text-center mt-8 text-xl">Book not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <p><strong>Author ID:</strong> {book.authorId}</p>
      <p><strong>Genre ID:</strong> {book.genreId}</p>
      <p><strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
      <p><strong>Summary:</strong> {book.summary}</p>
    </div>
  );
};

export default BookDetails;