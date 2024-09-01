import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import GenreForm from '../../../components/genres/GenreForm';

export default function EditGenre() {
  const [genre, setGenre] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchGenre();
    }
  }, [id]);

  const fetchGenre = async () => {
    const response = await fetch(`/api/genres/${id}`);
    if (response.ok) {
      const data = await response.json();
      setGenre(data);
    } else {
      alert('Failed to fetch genre');
      router.push('/genres');
    }
  };

  if (!genre) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Genre</h1>
      <GenreForm genre={genre} />
    </Layout>
  );
}