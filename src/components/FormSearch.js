import { useState, useEffect, useRef } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import { SearchIcon } from '@heroicons/react/solid';
import useStore from 'store';

function FormSearch(props) {
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
    if (!search) return;
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
    <form onSubmit={handleSubmit} className={props.className}>
      <label className="relative block w-full">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <SearchIcon className="h-5 w-5 fill-slate-300 dark:fill-slate-400" />
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-300 block bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md w-full py-2 pl-9 pr-3 focus:outline-none focus:border-cyan-500 text-sm transition-colors dark:focus:border-cyan-600"
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
      {props?.withButton && (
        <button
          type="submit"
          disabled={!search}
          className="bg-cyan-600 px-4 py-2 h-10 text-white rounded-md text-sm hover:bg-cyan-500 disabled:opacity-50 transition-all flex items-center justify-center disabled:select-none active:scale-95 disabled:scale-95 disabled:bg-cyan-500"
        >
          Search
        </button>
      )}
    </form>
  );
}

export default FormSearch;
