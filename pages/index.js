import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Home | Library Management System">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to the Library Management System</h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your library's collection of books, authors, and genres with ease.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Books', 'Authors', 'Genres'].map((section) => (
            <Link
              key={section}
              href={`/${section.toLowerCase()}`}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-900">{section}</h2>
                <p className="mt-1 text-gray-600">Manage your {section.toLowerCase()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}