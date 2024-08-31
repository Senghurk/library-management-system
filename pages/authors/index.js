import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AuthorList from '../../components/authors/AuthorList';
import Link from 'next/link';
import { useNotification } from '../../contexts/NotificationContext';

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await fetch('/api/authors');
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        const data = await response.json();
        setAuthors(data);
        showNotification('Authors loaded successfully');
      } catch (error) {
        console.error('Error fetching authors:', error);
        showNotification('Failed to load authors', 'error');
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuthors();
  }, []);

  return (
    <Layout title="Authors | Library Management System">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Authors</h1>
          <Link href="/authors/add" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Add New Author
          </Link>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading authors...</p>
        ) : (
          <AuthorList authors={authors} />
        )}
      </div>
    </Layout>
  );
}