import { useState } from 'react';
import { useRouter } from 'next/router';

const GenreForm = ({ genre }) => {
  const [name, setName] = useState(genre?.name || '');
  const [description, setDescription] = useState(genre?.description || '');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const genreData = { name, description };
    const url = genre ? `/api/genres/${genre._id}` : '/api/genres';
    const method = genre ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genreData),
      });

      if (!response.ok) {
        throw new Error('Failed to save genre');
      }

      router.push('/genres');
    } catch (error) {
      console.error('Error saving genre:', error);
      alert('Failed to save genre');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="description" className="block">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-2 py-1"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {genre ? 'Update Genre' : 'Add Genre'}
      </button>
    </form>
  );
};

export default GenreForm;