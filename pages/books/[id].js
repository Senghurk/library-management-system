import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) throw new Error('Failed to fetch book details');
      const data = await response.json();
      setBook(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><p>Loading book details...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;
  if (!book) return <Layout><p>Book not found</p></Layout>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p><strong>Author:</strong> {book.authorId?.name || 'Unknown'}</p>
        <p><strong>Genre:</strong> {book.genreId?.name || 'Unknown'}</p>
        <p><strong>Published:</strong> {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'Unknown'}</p>
        <p><strong>Summary:</strong> {book.summary || 'No summary available'}</p>
        <div className="mt-4">
          <Link href="/books" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Back to Books
          </Link>
          <Link href={`/books/${book._id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Edit Book
          </Link>
        </div>
      </div>
    </Layout>
  );
}