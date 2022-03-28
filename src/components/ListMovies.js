import CardMovie from 'components/CardMovie';
import Pagination from 'components/Pagination';

function ListMovies({ listing, currentPage, setPage, totalPages }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {listing.length > 0 &&
          listing.map((item) => <CardMovie key={item.id} {...item} />)}
      </div>
      {currentPage && setPage && totalPages && (
        <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
}

export default ListMovies;
