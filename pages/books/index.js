import { useState, useEffect } from 'react';
import BookList from '../../components/books/BookList';
import Layout from '../../components/Layout';

export default function Books() {
  const [initialBooks, setInitialBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setInitialBooks(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <Layout><p>Loading books...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <BookList initialBooks={initialBooks} />
    </Layout>
  );
}