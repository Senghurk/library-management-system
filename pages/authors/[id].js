import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function AuthorDetail() {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const fetchAuthor = async () => {
    try {
      const response = await fetch(`/api/authors/${id}`);
      if (!response.ok) throw new Error('Failed to fetch author details');
      const data = await response.json();
      setAuthor(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };

  if (loading) return <Layout><p>Loading author details...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;
  if (!author) return <Layout><p>Author not found</p></Layout>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{author.name || 'Unknown Author'}</h1>
        <p><strong>Nationality:</strong> {author.nationality || 'Unknown'}</p>
        <p><strong>Born:</strong> {formatDate(author.birthDate)}</p>
        <p><strong>Bio:</strong> {author.biography || 'No biography available'}</p>
        
        <h2 className="text-2xl font-bold mt-6 mb-2">Books by this author:</h2>
        {author.books && author.books.length > 0 ? (
          <ul className="list-disc list-inside mb-6">
            {author.books.map((book, index) => (
              <li key={index}>{book.title}</li>
            ))}
          </ul>
        ) : (
          <p className="mb-6">No books found for this author.</p>
        )}
        
        <div className="flex space-x-2">
          <Link href="/authors" className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to Authors
          </Link>
          <Link href={`/authors/${author._id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Edit Author
          </Link>
        </div>
      </div>
    </Layout>
  );
}