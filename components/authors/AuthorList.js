// components/authors/AuthorList.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { useNotification } from '@/contexts/NotificationContext';

export const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/authors');
      if (!response.ok) {
        throw new Error(`Failed to fetch authors: ${response.statusText}`);
      }
      const data = await response.json();
      setAuthors(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching authors:', err);
      setError(err.message);
      setLoading(false);
      showNotification(`Error: ${err.message}`, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        const response = await fetch(`/api/authors/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete author');
        }
        showNotification('Author deleted successfully', 'success');
        fetchAuthors(); // Refresh the list
      } catch (error) {
        console.error('Error deleting author:', error);
        showNotification(`Error: ${error.message}`, 'error');
      }
    }
  };

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {authors.map((author) => (
        <Card key={author.id}>
          <h3 className="text-xl font-bold">{author.name}</h3>
          <p>Nationality: {author.nationality}</p>
          <p>Birth Date: {author.birthdate}</p>
          <div className="mt-4">
            <Link href={`/authors/${author.id}`} className="text-blue-500 hover:underline mr-2">
              View
            </Link>
            <Link href={`/authors/${author.id}/edit`} className="text-green-500 hover:underline mr-2">
              Edit
            </Link>
            <button 
              onClick={() => handleDelete(author.id)} 
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};