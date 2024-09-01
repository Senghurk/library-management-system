import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Library Management System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/books" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Manage Books
          </Link>
          <Link href="/authors" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">
            Manage Authors
          </Link>
          <Link href="/genres" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-center">
            Manage Genres
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;