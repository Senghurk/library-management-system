import React from 'react';
import Link from 'next/link';
import { Book, Users, Tag, Home } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl text-blue-500">Library MS</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <NavLink href="/" icon={<Home size={18} />}>Home</NavLink>
              <NavLink href="/books" icon={<Book size={18} />}>Books</NavLink>
              <NavLink href="/authors" icon={<Users size={18} />}>Authors</NavLink>
              <NavLink href="/genres" icon={<Tag size={18} />}>Genres</NavLink>
            </nav>
          </div>
        </div>  
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {children}
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300">
                Library Management System is dedicated to simplifying book organization and discovery for VMS students.
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">Email: info@vms.au.edu</p>
              <p className="text-gray-300">Tel: (66) 02 723 2380</p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Library Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ href, children, icon }) => (
  <Link 
    href={href} 
    className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors duration-300"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Layout;