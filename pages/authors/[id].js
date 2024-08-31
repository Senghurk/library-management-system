import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthorDetails = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  if (loading) return <div className="text-center mt-8 text-xl">Loading author details...</div>;
  if (error) return <div className="text-center mt-8 text-xl text-red-500">Error: {error}</div>;
  if (!author) return <div className="text-center mt-8 text-xl">Author not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{author.name}</h1>
      <p><strong>Nationality:</strong> {author.nationality}</p>
      <p><strong>Born:</strong> {new Date(author.birthDate).toLocaleDateString()}</p>
      <p><strong>Bio:</strong> {author.bio}</p>
    </div>
  );
};

export default AuthorDetails;
