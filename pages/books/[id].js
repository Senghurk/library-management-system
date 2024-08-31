import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BookDetails = () => {
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
    if (response.ok) {
      const data = await response.json();
      setBook(data);
    } else {
      console.error('Failed to fetch book details');
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published Year:</strong> {book.publishedYear}</p>
      <p><strong>Summary:</strong> {book.summary}</p>
      <div className="mt-4">
        <Link href="/books" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
          Back to List
        </Link>
        <Link href={`/books/${id}/edit`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Edit Book
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;