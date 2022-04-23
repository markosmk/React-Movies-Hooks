import { useEffect, useState } from 'react';

import HeaderPage from 'components/HeaderPage';
import ListMovies from 'components/ListMovies';

import useStore from 'store';
import shallow from 'zustand/shallow';

function Upcoming() {
  const isLoading = useStore((state) => state.upcoming?.isLoading);
  const results = useStore((state) => state.upcoming.results, shallow);
  const total_pages = useStore((state) => state.upcoming?.total_pages, shallow);
  const getUpcoming = useStore((state) => state.getUpcoming, shallow);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getUpcoming?.(page);
  }, [page, getUpcoming]);

  return (
    <>
      <HeaderPage
        title="Upcoming"
        description={`The most exciting new films coming in ${new Date().getFullYear()} and beyond`}
      />
      <div className="container">
        <ListMovies
          isLoading={isLoading}
          listing={results}
          currentPage={page}
          setPage={setPage}
          totalPages={total_pages}
        />
      </div>
    </>
  );
}

export default Upcoming;
