import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchIcon } from '@heroicons/react/solid';
import ListMovies from 'components/ListMovies';
import useStore from 'store/index';

function Search() {
  const { results, total_pages, total_results } = useStore((state) => state.search);
  const getSearchMovies = useStore((state) => state.getSearchMovies);

  const inputSearch = useRef(null);
  const [searchHeader, setSearchHeader] = useSearchParams({});
  const [search, setSearch] = useState('');

  console.log('searchHeader Params', searchHeader.get('q'));
  console.log('search', search);

  // if submit form change list movies
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchMovies(search);
    setSearchHeader({ q: search });
  };

  // if change page update list movies
  const setPage = (newPage) => {
    getSearchMovies(search, newPage);
  };

  // if exists query 'q' in urlParams update list movies
  useEffect(() => {
    if (searchHeader.get('q')) {
      inputSearch.current.value = searchHeader.get('q');
      setSearch(searchHeader.get('q'));
      getSearchMovies(searchHeader.get('q'));
    }
  }, [searchHeader, getSearchMovies]);

  return (
    <div className="container">
      <div className="p-24 bg-gray-100 rounded-xl text-center">
        <h2 className="mb-3 text-5xl font-bold text-black">
          {search
            ? total_results + ' found for ' + search || searchHeader.get('q') + '.'
            : 'Search Movies!'}
        </h2>
        <p className="mb-0 text-sm leading-7 py-4">
          Get recommendations for new movies to watch, rent, stream, or own.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="relative block mr-4">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon className="h-5 w-5 fill-slate-300" />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for movie..."
              type="text"
              name="search"
              ref={inputSearch}
              onChange={(e) => {
                const text = inputSearch.current.value;
                setSearch(text);
              }}
            />
          </label>
        </form>
      </div>

      <ListMovies listing={results} setPage={setPage} totalPages={total_pages} />
    </div>
  );
}

export default Search;
