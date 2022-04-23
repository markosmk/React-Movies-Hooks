import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ListMovies from 'components/ListMovies';
import HeaderPage from 'components/HeaderPage';
import Filters from 'pages/Movies/components/Filters';

import useStore from 'store';
import shallow from 'zustand/shallow';

function Movies() {
  const [searchParams] = useSearchParams();
  const queryProvider = searchParams.get('providers') || '';

  const getProviders = useStore((state) => state.getProviders, shallow);
  const total = useStore((state) => state.movies.total_pages, shallow);
  const movies = useStore((state) => state.movies.results, shallow);
  const isLoading = useStore((state) => state.movies.isLoading, shallow);
  const getMovies = useStore((state) => state.getMovies, shallow);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ genres: [], providers: [], sort: '' });

  useEffect(() => {
    getProviders();
  }, [getProviders]);

  useEffect(() => {
    getMovies(page, filters);
  }, [page, filters, getMovies]);

  return (
    <>
      <HeaderPage
        title="Discover Movies"
        description="Here you can discover new movies with their details by frequently updated lists."
      />
      <div className="container">
        <Filters query={queryProvider} filters={filters} setFilters={setFilters} />

        <ListMovies
          isLoading={isLoading}
          listing={movies}
          currentPage={page}
          setPage={setPage}
          totalPages={total}
        />
      </div>
    </>
  );
}

export default Movies;
