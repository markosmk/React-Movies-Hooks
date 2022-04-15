import { useState, useEffect, useRef } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import { SearchIcon } from '@heroicons/react/solid';
import useStore from 'store';

function FormSearch() {
  let navigate = useNavigate();
  const getSearchMovies = useStore((state) => state.getSearchMovies);

  const inputSearch = useRef(null);
  const [searchHeader, setSearchHeader] = useSearchParams({});
  const [search, setSearch] = useState('');

  // update all inputs search
  useEffect(() => {
    if (searchHeader.get('q')) {
      setSearch(searchHeader.get('q'));
    }
  }, [searchHeader]);

  // if submit form change list movies
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchMovies(search);
    setSearchHeader({ q: search });
    // only change if not is in search page
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        q: search,
      })}`,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <SearchIcon className="h-5 w-5 fill-slate-300 dark:fill-slate-400" />
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-300 block bg-white dark:bg-slate-800 w-full border-2 border-slate-300 dark:border-slate-600 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-cyan-500 sm:text-sm transition-colors"
          placeholder="Search for movie..."
          type="text"
          name="search"
          ref={inputSearch}
          value={search}
          onChange={() => {
            const text = inputSearch.current.value;
            setSearch(text);
          }}
        />
      </label>
    </form>
  );
}

export default FormSearch;
