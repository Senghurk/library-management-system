// components/Layout.js
import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="font-bold text-xl text-primary hover:text-secondary transition-colors duration-300">
                  Library Management
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink href="/books">Books</NavLink>
                <NavLink href="/authors">Authors</NavLink>
                <NavLink href="/genres">Genres</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Library Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ href, children }) => (
  <Link 
    href={href} 
    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-primary hover:border-primary transition-colors duration-300"
  >
    {children}
  </Link>
);

export default Layout;