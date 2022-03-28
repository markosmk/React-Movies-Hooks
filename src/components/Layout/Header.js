import React, { Fragment, useState } from 'react';
import { Link, NavLink, useNavigate, createSearchParams } from 'react-router-dom';

import AvatarLetter from '../AvatarLetter';
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';
import {
  SearchIcon,
  CollectionIcon,
  UserIcon,
  LogoutIcon,
  HeartIcon,
} from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';

function Header() {
  // const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        q: search,
      })}`,
    });
  };

  // useEffect(() => {
  //   setSearch(searchParams.get('q'));
  // }, [searchParams]);

  return (
    <div className="py-5 bg-transparent">
      <div className="container">
        <div className="flex">
          {/** Navigation */}
          <div className="relative flex flex-wrap items-center justify-start p-0 w-2/3">
            <div className="leading-5 relative">
              <Link to="/">
                <ReactLogo className="h-6" />
              </Link>
            </div>
            <ul className="flex ml-10 mt-1 gap-5">
              <li className="">
                <NavLink
                  to="/movies"
                  className="leading-5 font-medium text-slate-600 hover:text-sky-500 transition-colors"
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tv"
                  className="leading-5 font-medium text-slate-600 hover:text-sky-500 transition-colors"
                >
                  Series
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upcoming"
                  className="leading-5 font-medium text-slate-600 hover:text-sky-500 transition-colors"
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="leading-5 font-medium text-slate-600 hover:text-sky-500 transition-colors"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          {/** Menu right */}
          <div className="relative flex flex-wrap items-center justify-end p-0 w-1/3">
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
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </label>
            </form>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center hover:opacity-80">
                  <AvatarLetter />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-slate-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-sky-500 text-white' : 'text-slate-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <UserIcon
                              className="w-5 h-5 mr-2 text-sky-200"
                              aria-hidden="true"
                            />
                          ) : (
                            <UserIcon
                              className="w-5 h-5 mr-2 text-slate-400"
                              aria-hidden="true"
                            />
                          )}
                          Account
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-sky-500 text-white' : 'text-slate-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <HeartIcon
                              className="w-5 h-5 mr-2 text-sky-200"
                              aria-hidden="true"
                            />
                          ) : (
                            <HeartIcon
                              className="w-5 h-5 mr-2 text-slate-400"
                              aria-hidden="true"
                            />
                          )}
                          Favourites
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-sky-500 text-white' : 'text-slate-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <CollectionIcon
                              className="w-5 h-5 mr-2 text-sky-200"
                              aria-hidden="true"
                            />
                          ) : (
                            <CollectionIcon
                              className="w-5 h-5 mr-2 text-slate-400"
                              aria-hidden="true"
                            />
                          )}
                          Recomendations
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-sky-500 text-white' : 'text-slate-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <LogoutIcon
                              className="w-5 h-5 mr-2 text-sky-200"
                              aria-hidden="true"
                            />
                          ) : (
                            <LogoutIcon
                              className="w-5 h-5 mr-2 text-slate-400"
                              aria-hidden="true"
                            />
                          )}
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
