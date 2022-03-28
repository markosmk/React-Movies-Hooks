import { useEffect, useState } from 'react';

import ListMovies from 'components/ListMovies';
import useStore from 'store';

function Series() {
  // const isLoading = useStore((state) => state.tv?.isLoading);
  const results = useStore((state) => state.tv.results);
  const total_pages = useStore((state) => state.tv?.total_pages);
  const getTvSeries = useStore((state) => state.getTvSeries);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getTvSeries(page);
  }, [page, getTvSeries]);

  return (
    <div className="container">
      <div className="p-24 bg-gray-100 rounded-xl text-center">
        <h2 className="mb-3 text-5xl font-bold text-black">Series</h2>
        <p className="mb-0 text-sm leading-7 py-4">
          This year is presented as an epic year in the world of series, all platforms
          revolutionize their catalogs
        </p>
      </div>

      <ListMovies
        listing={results}
        currentPage={page}
        setPage={setPage}
        totalPages={total_pages}
      />
    </div>
  );
}

export default Series;
