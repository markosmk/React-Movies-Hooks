import ListMovies from 'components/ListMovies';

function PopulatedList({ listing, isLoading }) {
  return (
    <>
      <h2 className="text-2xl font-semibold my-6">Popular Movies</h2>
      <ListMovies isLoading={isLoading} spinners={4} listing={listing} />
    </>
  );
}

export default PopulatedList;
