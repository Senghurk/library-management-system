import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditAuthor = () => {
  const [author, setAuthor] = useState(null);
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/authors/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch author');
        }
        const data = await response.json();
        setAuthor(data);
        setName(data.name);
        setNationality(data.nationality);
        setBirthDate(data.birthDate);
        setBio(data.bio);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/authors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, nationality, birthDate, bio }),
      });
      if (!response.ok) {
        throw new Error('Failed to update author');
      }
      router.push(`/authors/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!author) return <div className="text-center mt-8 text-xl">Loading author details...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Author</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          placeholder="Nationality"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="Birth Date"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-full p-2 border rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Author
        </button>
      </form>
    </div>
  );
};

export default EditAuthor;
