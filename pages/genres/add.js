import Layout from '../../components/Layout';
import GenreForm from '../../components/genres/GenreForm';

export default function AddGenre() {
  return (
    <Layout>
      <br/>
      <h1 className="text-2xl font-bold mb-4">Add New Genre</h1>
      <GenreForm />
    </Layout>
  );
}