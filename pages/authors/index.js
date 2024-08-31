import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('/api/authors');
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        const data = await response.json();
        setAuthors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <div className="text-center mt-8 text-xl">Loading authors...</div>;
  if (error) return <div className="text-center mt-8 text-xl text-red-500">Error: {error}</div>;
  if (authors.length === 0) return <div className="text-center mt-8 text-xl">No authors found. Add some authors to get started!</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Author List</h1>
      <Link href="/authors/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Author
      </Link>
      <ul className="mt-6 space-y-4">
        {authors.map(author => (
          <li key={author.id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold">{author.name}</span>
              <p className="text-sm text-gray-600">{author.nationality}</p>
              <p className="text-sm text-gray-600">Born: {new Date(author.birthDate).toLocaleDateString()}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/authors/${author.id}`} className="text-blue-500 hover:text-blue-700">View</Link>
              <Link href={`/authors/${author.id}/edit`} className="text-green-500 hover:text-green-700">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
