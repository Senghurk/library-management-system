import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BookForm from '../../components/books/BookForm';

export default function AddBook() {
  const router = useRouter();

  const handleSubmit = async (bookData) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        router.push('/books');
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Layout title="Add Book | Library Management System">
      <div className="max-w-2xl mx-auto px-4 py-5 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Book</h1>
        <BookForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}