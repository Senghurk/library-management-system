// pages/books/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchBook() {
        try {
          const response = await fetch(`/api/books/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch book');
          }
          const data = await response.json();
          setBook(data);
        } catch (error) {
          console.error('Error fetching book:', error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchBook();
    }
  }, [id]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (!book) {
    return <Layout>Book not found</Layout>;
  }

  return (
    <Layout title={`${book.title} | Library Management System`}>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p className="text-lg mb-2">Author ID: {book.authorId}</p>
        <p className="text-lg mb-2">Genre ID: {book.genreId}</p>
        <p className="text-lg mb-2">Published Date: {book.publishedDate}</p>
        <p className="text-lg mb-4">Summary: {book.summary}</p>
        <div className="flex space-x-4">
          <Link href={`/books/${id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </Link>
          <button 
            onClick={async () => {
              if (confirm('Are you sure you want to delete this book?')) {
                const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
                if (res.ok) {
                  router.push('/books');
                } else {
                  alert('Failed to delete the book');
                }
              }
            }} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
          <Link href="/books" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Back to Books
          </Link>
        </div>
      </div>
    </Layout>
  );
}