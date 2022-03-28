import { useEffect, useState } from 'react';

import { CheckIcon } from '@heroicons/react/solid';
import ListMovies from 'components/ListMovies';

import useStore from 'store';

function Movies() {
  const genres = useStore((state) => state.genres);
  const providers = useStore((state) => state.providers);
  const getGenres = useStore((state) => state.getGenres);
  const getProviders = useStore((state) => state.getProviders);

  const movies = useStore((state) => state.movies);
  const getMovies = useStore((state) => state.getMovies);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ genres: [], providers: [] });

  useEffect(() => {
    getGenres();
    getProviders();
  }, [getGenres, getProviders]);

  useEffect(() => {
    getMovies(page, filters);
  }, [page, filters, getMovies]);

  const handleGenre = (id) => {
    let newFilterGenres = [];
    if (filters.genres.includes(id)) {
      newFilterGenres = filters.genres.filter((item) => item !== id);
    } else {
      newFilterGenres = [...filters.genres, id];
    }
    setFilters({ ...filters, genres: [...new Set(newFilterGenres)] });
    // setFilters([...new Set(newFilter)]);
  };
  const handleProvider = (id) => {
    let newFilter = [];
    if (filters.providers.includes(id)) {
      newFilter = filters.providers.filter((item) => item !== id);
    } else {
      newFilter = [...filters.providers, id];
    }
    setFilters({ ...filters, providers: [...new Set(newFilter)] });
  };

  return (
    <div className="container">
      <div className="p-24 bg-gray-100 rounded-xl text-center">
        <h2 className="mb-3 text-5xl font-bold text-black">Discover Movies</h2>
        <p className="mb-0 text-sm leading-7 py-4">
          Here you can discover new movies with their details by frequently updated lists.
        </p>
      </div>

      <h3>Providers</h3>
      <div className="flex gap-4 my-4 flex-wrap">
        {providers &&
          providers.map(({ id, name, logo }) => (
            <div
              key={id}
              onClick={() => handleProvider(id)}
              className={`border-2 border-slate-200 px-3 py-2 text-sm rounded-md flex hover:bg-slate-200 cursor-pointer items-center ${
                filters.providers.includes(id) && 'bg-slate-200'
              }`}
            >
              {name}
              <img src={logo} alt={name} />

              {filters.providers.includes(id) && (
                <span className="ml-1">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                </span>
              )}
            </div>
          ))}
      </div>

      <h3>Genres</h3>
      <div className="flex gap-4 my-4 flex-wrap">
        {genres &&
          genres.map(({ id, name }) => (
            <div
              key={id}
              onClick={() => handleGenre(id)}
              className={`border-2 border-slate-200 px-3 py-2 text-sm rounded-md flex hover:bg-slate-200 cursor-pointer items-center ${
                filters.genres.includes(id) && 'bg-slate-200'
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
        listing={movies.results}
        currentPage={page}
        setPage={setPage}
        totalPages={movies.total_pages}
      />
    </div>
  );
}

export default Movies;
