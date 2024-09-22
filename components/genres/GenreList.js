import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/genres');
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      if (Array.isArray(data)) {
        setGenres(data);
      } else if (data && Array.isArray(data.data)) {
        setGenres(data.data);
      } else {
        console.error('Unexpected data format:', data);
        setGenres([]);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setError('Failed to load genres. Please try again later.');
      setGenres([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      try {
        const response = await fetch(`/api/genres/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete genre');
        }

        // Remove the deleted genre from the state
        setGenres(genres.filter(genre => genre._id !== id));
      } catch (error) {
        console.error('Error deleting genre:', error);
        setError('Failed to delete genre. Please try again later.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4"><br/>
      <h1 className="text-2xl font-bold mb-4">Genres</h1>
      <Link href="/genres/add" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add New Genre
      </Link>
      {isLoading ? (
        <p className="mt-4">Loading genres...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : genres.length === 0 ? (
        <p className="mt-4">No genres found. Add a new genre to get started!</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {genres.map((genre) => (
            <div key={genre._id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{genre.name}</h2>
              <p className="text-gray-600">{genre.description}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => router.push(`/genres/${genre._id}`)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/genres/${genre._id}/edit`)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(genre._id)}
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
  );
};

export default GenreList;