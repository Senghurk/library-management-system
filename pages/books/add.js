import Layout from '../../components/Layout';
import BookForm from '../../components/books/BookForm';

export default function AddBookPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4"><br/>Add New Book</h1>
      <BookForm />
    </Layout>
  );
}