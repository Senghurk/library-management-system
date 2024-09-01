import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function AuthorDetails() {
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchAuthor() {
        try {
          const response = await fetch(`/api/authors/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch author');
          }
          const data = await response.json();
          setAuthor(data);
        } catch (error) {
          console.error('Error fetching author:', error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchAuthor();
    }
  }, [id]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (!author) {
    return <Layout>Author not found</Layout>;
  }

  return (
    <Layout title={`${author.name} | Library Management System`}>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
        <p className="text-lg mb-2"><strong>Nationality:</strong> {author.nationality}</p>
        <p className="text-lg mb-2"><strong>Born:</strong> {new Date(author.birthDate).toLocaleDateString()}</p>
        <p className="text-lg mb-4"><strong>Bio:</strong> {author.biography}</p>
        <Link href="/authors" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Authors
        </Link>
      </div>
    </Layout>
  );
}