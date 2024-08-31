// pages/index.js
import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Library Management System</h1>
        <p className="mb-4">Select a category to manage:</p>
        <div className="flex justify-center space-x-4">
          <Link href="/books" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Manage Books
          </Link>
          <Link href="/authors" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Manage Authors
          </Link>
          <Link href="/genres" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Manage Genres
          </Link>
        </div>
      </div>
    </Layout>
  );
}