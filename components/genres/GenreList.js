import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await fetch('/api/genres');
    const data = await response.json();
    setGenres(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      const response = await fetch(`/api/genres/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchGenres();
      } else {
        alert('Failed to delete genre');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Genres</h1>
      <Link href="/genres/add" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add New Genre
      </Link>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <div key={genre.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{genre.name}</h2>
            <p className="text-gray-600">{genre.description}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => router.push(`/genres/${genre.id}`)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/genres/${genre.id}/edit`)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(genre.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;