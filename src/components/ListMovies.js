import CardMovie from 'components/CardMovie';
import Pagination from 'components/Pagination';
import { SpinnerCard } from 'components/Spinner';

function ListMovies({
  isLoading,
  spinners = 8,
  listing,
  currentPage,
  setPage,
  totalPages,
  type,
}) {
  if (isLoading) {
    return <SpinnerCard count={spinners} />;
  }

  return (
    <>
      {listing.length === 0 ? (
        <p className="flex justify-center my-6 text-slate-400">No results found</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
            {listing.map((item) => (
              <CardMovie key={item.id} {...item} />
            ))}
          </div>
          {setPage && totalPages && (
            <Pagination
              currentPage={currentPage}
              setPage={setPage}
              type={type}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </>
  );
}

export default ListMovies;
