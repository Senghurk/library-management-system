import Link from 'next/link';

export default function Card({ title, subtitle, link, linkText }) {
  return (
    <div className="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {subtitle}
          </p>
        )}
        {link && (
          <div className="mt-4">
            <Link href={link} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              {linkText || "View details"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}