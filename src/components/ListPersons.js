import CardPerson from 'components/CardPerson';
import Pagination from 'components/Pagination';

function ListPersons({ listing, currentPage, setPage, totalPages, type }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {listing.length > 0 &&
          listing.map((item) => <CardPerson key={item.id} {...item} />)}
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
  );
}

export default ListPersons;
