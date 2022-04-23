import { useEffect, useState } from 'react';

import ListMovies from 'components/ListMovies';
import { SpinnerCard } from 'components/Spinner';
import useStore from 'store';
import HeaderPage from 'components/HeaderPage';
import shallow from 'zustand/shallow';

function Series() {
  const isLoading = useStore((state) => state.tv?.isLoading);
  const results = useStore((state) => state.tv.results, shallow);
  const total_pages = useStore((state) => state.tv?.total_pages, shallow);
  const getTvSeries = useStore((state) => state.getTvSeries, shallow);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getTvSeries(page);
  }, [page, getTvSeries]);

  return (
    <>
      <HeaderPage
        title="Series"
        description="This year is presented as an epic year in the world of series, all platforms
        revolutionize their catalogs"
      />
      <div className="container">
        {isLoading ? (
          <SpinnerCard />
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

export default Series;
