import { useEffect, useState } from 'react';

import ListMovies from 'components/ListMovies';
import { SpinnerCard } from 'components/Spinner';
import useStore from 'store';

function Upcoming() {
  const isLoading = useStore((state) => state.upcoming?.isLoading);
  const results = useStore((state) => state.upcoming.results);
  const total_pages = useStore((state) => state.upcoming?.total_pages);
  const getUpcoming = useStore((state) => state.getUpcoming);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getUpcoming?.(page);
  }, [page, getUpcoming]);

  console.log(results, total_pages);

  return (
    <>
      <div className="">
        <div className="p-12 bg-gray-100 text-center">
          <h2 className="mb-3 text-5xl font-bold text-black uppercase">Upcoming</h2>
          <p className="mb-0 py-4">
            The most exciting new films coming in {new Date().getFullYear()} and beyond
          </p>
        </div>
      </div>
      <div className="container">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
            <SpinnerCard />
          </div>
        ) : (
          <ListMovies
            listing={results}
            currentPage={page}
            setPage={setPage}
            totalPages={total_pages}
          />
        )}
      </div>
    </>
  );
}

export default Upcoming;
