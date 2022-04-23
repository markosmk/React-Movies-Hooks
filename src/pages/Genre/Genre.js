import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import HeaderPage from 'components/HeaderPage';
import ListMovies from 'components/ListMovies';
import { CheckIcon } from '@heroicons/react/solid';

import useStore from 'store';
import shallow from 'zustand/shallow';

// TODO: add pagination in query genre/12?page=2
function Genre() {
  const { id } = useParams();

  const genres = useStore((state) => state.genres, shallow);
  const moviesByGenre = useStore((state) => state.moviesByGenre, shallow);
  const getMoviesByGenre = useStore((state) => state.getMoviesByGenre, shallow);
  const isLoading = useStore((state) => state.moviesByGenre.isLoading, shallow);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ genres: [], providers: [], sort: '' });

  const handleGenre = (id) => {
    let newFilterGenres = [];
    if (filters.genres.includes(id)) {
      newFilterGenres = filters.genres.filter((item) => item !== id);
    } else {
      newFilterGenres = [...filters.genres, id];
    }
    setFilters({ ...filters, genres: [...new Set(newFilterGenres)] });
  };

  useEffect(() => {
    if (id) {
      setFilters((f) => ({ ...f, genres: [Number(id)] }));
    }
  }, [id]);

  useEffect(() => {
    getMoviesByGenre(page, filters);
  }, [page, filters, getMoviesByGenre]);

  // only select title for headPage
  const genreSelected = () => {
    if (genres.results.length > 0 && filters.genres.length === 1) {
      const ide = filters.genres[0] || Number(id);
      return 'Genre: ' + genres.results.find((item) => item.id === ide)?.name;
    } else if (filters.genres.length > 1) {
      return 'Genre: Various';
    } else {
      return 'Movies by Genre';
    }
  };

  return (
    <>
      <HeaderPage
        title={genreSelected()}
        description={`The most exciting new films coming in ${new Date().getFullYear()} and beyond`}
      />

      <div className="container">
        <h2 className="text-2xl font-semibold my-6">Genres</h2>
        <div className="flex gap-4 mt-4 mb-6 flex-wrap">
          {genres.results.length > 0 &&
            genres.results.map(({ id, name }) => (
              <div
                key={id}
                onClick={() => handleGenre(id)}
                className={`border-2 border-slate-200 dark:border-slate-700 px-3 py-2 text-sm rounded-md flex hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer items-center ${
                  filters.genres.includes(id) && 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                {name}
                {filters.genres.includes(id) && (
                  <span className="ml-1">
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  </span>
                )}
              </div>
            ))}
        </div>

        <ListMovies
          isLoading={isLoading}
          listing={moviesByGenre.results}
          currentPage={page}
          setPage={setPage}
          totalPages={moviesByGenre.total_pages}
        />
      </div>
    </>
  );
}

export default Genre;
