// pages/books/index.js
import BookList from '@/components/books/BookList';
import Layout from '@/components/Layout';

export default function BooksPage() {
  return (
    <Layout>
      <BookList />
    </Layout>
  );
}