import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import GenreForm from '../../../components/genres/GenreForm';

export default function EditGenre() {
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchGenre();
    }
  }, [id]);

  const fetchGenre = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/genres/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch genre');
      }
      const data = await response.json();
      console.log("Fetched genre data:", data); // Debug log
      setGenre(data.data); // Assuming the API returns { data: { ... } }
    } catch (err) {
      console.error("Error fetching genre:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/genres');
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;
  if (!genre) return <Layout><div>Genre not found</div></Layout>;

  console.log("Rendering EditGenre with genre:", genre); // Debug log

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Genre</h1>
      <GenreForm genre={genre} onCancel={handleCancel} />
    </Layout>
  );
}