import ListMovies from 'components/ListMovies';

function RelatedList({ listing, title }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-8">{title || 'Related Movies'}</h2>
      <ListMovies listing={listing} />
    </div>
  );
}

export default RelatedList;
