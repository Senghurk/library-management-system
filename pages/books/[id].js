// pages/books/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    const response = await fetch(`/api/books/${id}`);
    const data = await response.json();
    setBook(data);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
        <p>Author ID: {book.authorId}</p>
        <p>Genre ID: {book.genreId}</p>
        <p>Published: {book.publishedDate}</p>
        <p>Summary: {book.summary}</p>
        <button
          onClick={() => router.push(`/books/${id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
        >
          Edit
        </button>
      </div>
    </Layout>
  );
}