import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

export default function GenreDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.isReady && id) {
      fetchGenre();
    } else if (router.isReady && !id) {
      setError('Invalid genre ID');
      setIsLoading(false);
    }
  }, [router.isReady, id]);

  const fetchGenre = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/genres/${id}`);
      const data = await res.json();
      if (data.success) {
        setGenre(data.data);
      } else {
        setError(data.message || 'Failed to fetch genre details');
      }
    } catch (err) {
      setError('An error occurred while fetching genre details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500">{error}</div>
      </Layout>
    );
  }

  if (!genre) {
    return (
      <Layout>
        <div>Genre not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{genre.name}</h1>
      <p>{genre.description}</p>
      <h2 className="text-xl font-bold mt-4 mb-2">Books in this genre:</h2>
      <ul>
        {genre.books && genre.books.length > 0 ? (
          genre.books.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))
        ) : (
          <li>No books found in this genre.</li>
        )}
      </ul>
    </Layout>
  );
}