import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { getAuthorById, updateAuthor } from '@/lib/db';

const EditAuthorPage = ({ initialAuthor }) => {
  const [author, setAuthor] = useState(initialAuthor);
  const router = useRouter();

  useEffect(() => {
    if (!initialAuthor) {
      router.push('/authors');
    }
  }, [initialAuthor, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAuthor(author.id, author);
      router.push('/authors');
    } catch (error) {
      console.error('Failed to update author:', error);
      // You might want to show an error message to the user here
    }
  };

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Edit Author</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={author.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="biography" className="block text-sm font-medium text-gray-700">Biography</label>
            <textarea
              id="biography"
              name="biography"
              value={author.biography}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={author.birthDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={author.nationality}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Author
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const author = await getAuthorById(params.id);
    return { props: { initialAuthor: author } };
  } catch (error) {
    console.error('Failed to fetch author:', error);
    return { props: { initialAuthor: null } };
  }
}

export default EditAuthorPage;