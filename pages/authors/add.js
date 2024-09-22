// pages/add.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const AddAuthor = () => {
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [biography, setBiography] = useState(''); // Renamed from bio
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorData = { name, nationality, birthDate, biography }; // Updated key
    console.log('Submitting Author Data:', authorData); // Debugging line

    try {
      const response = await fetch('/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add author');
      }

      router.push('/authors');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    router.push('/authors');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8"><br/>
        <h1 className="text-3xl font-bold mb-6">Add New Author</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Nationality"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Birth Date"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={biography} // Updated from bio
            onChange={(e) => setBiography(e.target.value)} // Updated handler
            placeholder="Biography"
            className="w-full p-2 border rounded"
            required
          />
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Author
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddAuthor;
