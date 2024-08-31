// pages/books/index.js
import Layout from '@/components/Layout';
import BookList from '@/components/books/BookList';
import { getAllBooks } from '@/lib/db';

export default function BooksPage({ initialBooks }) {
  return (
    <Layout title="Books | Library Management System">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Books</h1>
        <BookList initialBooks={initialBooks} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const books = await getAllBooks();
    return { 
      props: { 
        initialBooks: books 
      } 
    };
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return { 
      props: { 
        initialBooks: [] 
      } 
    };
  }
}