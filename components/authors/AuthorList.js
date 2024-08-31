import Card from '../Card';

export default function AuthorList({ authors }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {authors.map((author) => (
        <Card
          key={author.id}
          title={author.name}
          subtitle={`Nationality: ${author.nationality}`}
          link={`/authors/${author.id}`}
        />
      ))}
    </div>
  );
}