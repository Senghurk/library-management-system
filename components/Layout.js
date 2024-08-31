// components/Layout.js
import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link href="/" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">Library Management</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/books" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Books</Link>
                <Link href="/authors" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Authors</Link>
                <Link href="/genres" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Genres</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto mt-4 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;