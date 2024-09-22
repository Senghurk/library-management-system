import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const response = await fetch('/api/authors');
    const data = await response.json();
    setAuthors(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      const response = await fetch(`/api/authors/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchAuthors();
      } else {
        alert('Failed to delete author');
      }
    }
  };

  return (
    <div className="container mx-auto p-4"><br/>
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <Link href="/authors/add" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add New Author
      </Link>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <div key={author.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{author.name}</h2>
            <p className="text-gray-600">{author.nationality}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => router.push(`/authors/${author.id}`)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/authors/${author.id}/edit`)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(author.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;