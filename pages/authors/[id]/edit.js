import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';

export default function EditAuthor() {
  const [author, setAuthor] = useState({
    name: '',
    nationality: '',
    birthDate: '',
    biography: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchAuthor();
  }, [id]);

  const fetchAuthor = async () => {
    try {
      const res = await fetch(`/api/authors/${id}`);
      if (!res.ok) throw new Error('Failed to fetch author');
      const data = await res.json();
      setAuthor(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/authors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author),
      });
      if (!res.ok) throw new Error('Failed to update author');
      router.push(`/authors/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/authors/${id}`);
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Author</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={author.name}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label htmlFor="nationality" className="block">Nationality:</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={author.nationality}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="birthDate" className="block">Birth Date:</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={author.birthDate ? author.birthDate.split('T')[0] : ''}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="biography" className="block">Biography:</label>
            <textarea
              id="biography"
              name="biography"
              value={author.biography}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              rows="4"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update Author
            </button>
            <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}