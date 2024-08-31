import Layout from '@/components/Layout';
import BookList from '@/components/books/BookList';
import { getAllBooks } from '@/lib/db';

export default function BooksPage({ initialBooks }) {
  return (
    <Layout>
      <BookList initialBooks={initialBooks} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const books = await getAllBooks();
  return { props: { initialBooks: books } };
}