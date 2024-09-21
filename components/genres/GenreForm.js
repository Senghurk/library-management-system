import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const GenreForm = ({ genre, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const router = useRouter();

  useEffect(() => {
    console.log("GenreForm received genre:", genre); // Debug log
    if (genre) {
      setFormData({
        name: genre.name || '',
        description: genre.description || ''
      });
    }
  }, [genre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = genre ? `/api/genres/${genre._id}` : '/api/genres';
    const method = genre ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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

  console.log("Rendering GenreForm with formData:", formData); // Debug log

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="description" className="block">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          rows="4"
        ></textarea>
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {genre ? 'Update Genre' : 'Add Genre'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GenreForm;