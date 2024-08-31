import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNotification } from '@/contexts/NotificationContext';

const AuthorList = ({ initialAuthors }) => {
  const [authors, setAuthors] = useState(initialAuthors || []);
  const [loading, setLoading] = useState(!initialAuthors);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { showNotification } = useNotification();

  const fetchAuthors = useCallback(async () => {
    if (initialAuthors) return;
    try {
      setLoading(true);
      const response = await fetch('/api/authors');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      setAuthors(data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification, initialAuthors]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      const previousAuthors = [...authors];
      setAuthors(authors.filter(author => author.id !== id));
      
      try {
        const response = await fetch(`/api/authors/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete author');
        }
        showNotification('Author deleted successfully', 'success');
      } catch (err) {
        setAuthors(previousAuthors);
        showNotification(err.message, 'error');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-xl">Loading authors...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-xl text-red-500">Error: {error}</div>;
  }

  if (authors.length === 0) {
    return <div className="text-center mt-8 text-xl">No authors found. Add some authors to get started!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Author List</h1>
      <Link href="/authors/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Author
      </Link>
      <ul className="mt-6 space-y-4">
        {authors.map((author) => (
          <li key={author.id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold">{author.name}</span>
              <p className="text-sm text-gray-600">{author.nationality}</p>
              <p className="text-sm text-gray-600">Born: {new Date(author.birthDate).toLocaleDateString()}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/authors/${author.id}`} className="text-blue-500 hover:text-blue-700">
                View
              </Link>
              <Link href={`/authors/${author.id}/edit`} className="text-green-500 hover:text-green-700">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(author.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;