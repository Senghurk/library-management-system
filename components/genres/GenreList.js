import Card from '../Card';

export default function GenreList({ genres }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {genres.map((genre) => (
        <Card
          key={genre.id}
          title={genre.name}
          link={`/genres/${genre.id}`}
        />
      ))}
    </div>
  );
}