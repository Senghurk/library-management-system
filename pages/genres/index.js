import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/genres');
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <button onClick={() => router.push('/genres/new')}>Add New Genre</button>
    </div>
  );
};

export default GenresPage;