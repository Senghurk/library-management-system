import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">
              <Link href="/">Library Management System</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/books" className={`text-gray-800 hover:text-blue-500 ${router.pathname.startsWith('/books') ? 'text-blue-500' : ''}`}>
                Books
              </Link>
              <Link href="/authors" className={`text-gray-800 hover:text-blue-500 ${router.pathname.startsWith('/authors') ? 'text-blue-500' : ''}`}>
                Authors
              </Link>
              <Link href="/genres" className={`text-gray-800 hover:text-blue-500 ${router.pathname.startsWith('/genres') ? 'text-blue-500' : ''}`}>
                Genres
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-white shadow-md mt-8">
        <div className="container mx-auto px-6 py-3 text-center text-gray-600">
          © 2023 Library Management System
        </div>
      </footer>
    </div>
  );
};

export default Layout;