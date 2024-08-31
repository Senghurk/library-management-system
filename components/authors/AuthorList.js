import Link from 'next/link';

export default function AuthorList({ authors }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {authors.map((author) => (
        <div key={author.id} className="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {author.name}
            </h3>
            {author.nationality && (
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Nationality: {author.nationality}
              </p>
            )}
            <div className="mt-4">
              <Link href={`/authors/${author.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}