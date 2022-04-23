import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tab } from '@headlessui/react';
import ListPersons from 'components/ListPersons';
import ListMovies from 'components/ListMovies';
import HeaderPage from 'components/HeaderPage';
import FormSearch from 'components/FormSearch';
import { SpinnerCardWithFilter } from 'components/Spinner';

import useStore from 'store/index';
import shallow from 'zustand/shallow';
import { classNames } from 'helpers';

function Search() {
  const { total, movie, tv, person } = useStore((state) => state.search, shallow);
  const isLoading = useStore((state) => state.search.isLoading);
  const getSearchMovies = useStore((state) => state.getSearchMovies, shallow);
  const getPageSearch = useStore((state) => state.getPageSearch, shallow);

  const [searchHeader] = useSearchParams({});

  // if change page update list movies
  const setPage = (newPage, type) => {
    getPageSearch(searchHeader.get('q'), newPage, type);
  };

  // if exists query 'q' in urlParams update list movies
  useEffect(() => {
    if (searchHeader.get('q')) {
      getSearchMovies(searchHeader.get('q'));
    }
  }, [searchHeader, getSearchMovies]);

  const tabSections = [
    { title: 'Movies', count: movie?.total_results || 0 },
    { title: 'Tv Shows', count: tv?.total_results || 0 },
    { title: 'Persons', count: person?.total_results || 0 },
  ];

  return (
    <>
      <HeaderPage
        title={
          searchHeader.get('q')
            ? total + ' found for ' + searchHeader.get('q')
            : 'Search Movies!'
        }
        description="Get recommendations for new movies to watch, rent, stream, or own."
      >
        <FormSearch />
      </HeaderPage>

      {isLoading ? (
        <div className="container pt-6">
          <SpinnerCardWithFilter />
        </div>
      ) : (
        <div className="container pt-6">
          <Tab.Group>
            <Tab.List className="flex p-2 space-x-1 bg-slate-50 dark:bg-slate-800 rounded-lg">
              {tabSections.map((tab) => (
                <Tab
                  key={tab.title}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-3 text-sm leading-5 font-medium text-slate-400 rounded-md transition-colors',
                      selected
                        ? 'bg-cyan-500 text-cyan-100'
                        : 'hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-cyan-900 dark:hover:text-slate-200'
                    )
                  }
                >
                  {tab.title}
                  <span className="ml-2 font-bold">{tab.count}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ListMovies
                  listing={movie?.results}
                  currentPage={movie?.page}
                  setPage={setPage}
                  type="movie"
                  totalPages={movie?.total_pages}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ListMovies
                  listing={tv?.results}
                  currentPage={tv?.page}
                  setPage={setPage}
                  type="tv"
                  totalPages={tv?.total_pages}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ListPersons
                  listing={person?.results}
                  currentPage={person?.page}
                  setPage={setPage}
                  type="person"
                  totalPages={person?.total_pages}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </>
  );
}

export default Search;
