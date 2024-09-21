import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/authors');
      if (!response.ok) throw new Error('Failed to fetch authors');
      const data = await response.json();
      setAuthors(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        const response = await fetch(`/api/authors/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete author');
        fetchAuthors(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting author:', error);
        alert('Failed to delete author. Please try again.');
      }
    }
  };

  if (loading) return <Layout><p>Loading authors...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Authors</h1>
        <Link href="/authors/add" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Author
        </Link>
        {authors.length === 0 ? (
          <p className="mt-4">No authors found.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authors.map((author) => (
              <div key={author._id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{author.name}</h2>
                <p>Nationality: {author.nationality || 'Unknown'}</p>
                <p>Books: {author.books?.length || 0}</p>
                <p>Birth Date: {author.birthDate ? new Date(author.birthDate).toLocaleDateString() : 'Unknown'}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => router.push(`/authors/${author._id}`)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/authors/${author._id}/edit`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(author._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}