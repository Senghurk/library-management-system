import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          const bookResponse = await fetch(`/api/books/${id}`);
          if (!bookResponse.ok) {
            throw new Error('Failed to fetch book');
          }
          const bookData = await bookResponse.json();
          setBook(bookData);

          if (!bookData.authorName && bookData.authorId) {
            const authorResponse = await fetch(`/api/authors/${bookData.authorId}`);
            if (authorResponse.ok) {
              const authorData = await authorResponse.json();
              setAuthor(authorData);
            }
          }

          if (!bookData.genreName && bookData.genreId) {
            const genreResponse = await fetch(`/api/genres/${bookData.genreId}`);
            if (genreResponse.ok) {
              const genreData = await genreResponse.json();
              setGenre(genreData);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
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
        <p className="text-lg mb-2"><strong>Author:</strong> {book.authorName || author?.name || 'Unknown'}</p>
        <p className="text-lg mb-2"><strong>Genre:</strong> {book.genreName || genre?.name || 'Unknown'}</p>
        <p className="text-lg mb-2"><strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
        <p className="text-lg mb-4"><strong>Summary:</strong> {book.summary}</p>
        <div className="flex space-x-4">
          <Link href="/books" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Books
          </Link>
          <Link href={`/books/${id}/edit`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Edit Book
          </Link>
        </div>
      </div>
    </Layout>
  );
}