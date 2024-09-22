import Layout from '../../components/Layout';
import GenreForm from '../../components/genres/GenreForm';
import { useRouter } from 'next/router';

export default function AddGenre() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/genres');
  };

  return (
    <Layout>
      <br/>
      <h1 className="text-2xl font-bold mb-4">Add New Genre</h1>
      <GenreForm onCancel={handleCancel} />
    </Layout>
  );
}