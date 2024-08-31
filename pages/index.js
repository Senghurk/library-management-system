import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Home | Library Management System">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Library Management System</h1>
          <p className="text-xl">
            Manage your library's collection of books, authors, and genres with ease.
          </p>
        </div>
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Books', 'Authors', 'Genres'].map((section) => (
              <Link
                key={section}
                href={`/${section.toLowerCase()}`}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="text-4xl mb-4">
                  {section === 'Books' && '📚'}
                  {section === 'Authors' && '✍️'}
                  {section === 'Genres' && '🏷️'}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{section}</h2>
                <p className="text-gray-600">Manage your {section.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}