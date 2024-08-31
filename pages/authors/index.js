import Layout from '@/components/Layout';
import AuthorList from '@/components/authors/AuthorList';
import { getAllAuthors } from '@/lib/db';

export default function AuthorsPage({ initialAuthors }) {
  return (
    <Layout>
      <AuthorList initialAuthors={initialAuthors} />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const authors = await getAllAuthors();
    return { props: { initialAuthors: authors } };
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return { props: { initialAuthors: [] } };
  }
}