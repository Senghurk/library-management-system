import BookList from '@/components/books/BookList';
import { getAllBooks } from '@/lib/db'; // Make sure this function exists in your db.js file

export default function BooksPage({ initialBooks }) {
  return <BookList initialBooks={initialBooks} />;
}

export async function getServerSideProps() {
  const books = await getAllBooks();
  return { props: { initialBooks: books } };
}