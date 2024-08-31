import Card from '../Card';

export default function BookList({ books }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card
          key={book.id}
          title={book.title}
          subtitle={`By ${book.author} | Genre: ${book.genre}`}
          link={`/books/${book.id}`}
        />
      ))}
    </div>
  );
}