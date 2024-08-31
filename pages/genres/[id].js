import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function GenreDetails() {
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchGenre() {
        try {
          const response = await fetch(`/api/genres/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch genre');
          }
          const data = await response.json();
          setGenre(data);
        } catch (error) {
          console.error('Error fetching genre:', error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchGenre();
    }
  }, [id]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (!genre) {
    return <Layout>Genre not found</Layout>;
  }

  return (
    <Layout title={`${genre.name} | Library Management System`}>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{genre.name}</h1>
        <p className="text-lg mb-4">Description: {genre.description}</p>
        <Link href="/genres" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Genres
        </Link>
      </div>
    </Layout>
  );
}
