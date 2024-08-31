import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useNotification } from '../../../contexts/NotificationContext';

export default function EditGenre() {
  const router = useRouter();
  const { id } = router.query;
  const { showNotification } = useNotification();

  const [genre, setGenre] = useState({
    name: '',
    description: '',
  });

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
        }
      }
      fetchGenre();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenre(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/genres/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(genre),
      });

      if (response.ok) {
        showNotification('Genre updated successfully', 'success');
        router.push('/genres');
      } else {
        throw new Error('Failed to update genre');
      }
    } catch (error) {
      console.error('Error updating genre:', error);
      showNotification('Failed to update genre', 'error');
    }
  };

  return (
    <Layout title="Edit Genre | Library Management System">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Genre</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={genre.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              value={genre.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Genre
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
