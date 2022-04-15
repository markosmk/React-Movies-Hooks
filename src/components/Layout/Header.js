import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AvatarLetter from '../AvatarLetter';
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';
import { CollectionIcon, UserIcon, LogoutIcon, HeartIcon } from '@heroicons/react/solid';
import { Menu, Switch, Transition } from '@headlessui/react';
import useDarkMode from 'hooks/useDarkMode';
import FormSearch from 'components/FormSearch';
import useStore from 'store';

function Header() {
  const [darkMode, setDarkMode] = useDarkMode();
  const genres = useStore((state) => state.genres);
  // const region = useStore((state) => state.region);
  // const setRegion = useStore((state) => state.setRegion);
  // const setLanguage = useStore((state) => state.setLanguage);

  // const handleChangeRegion = (e) => {
  //   console.log(region);
  //   console.log(e.target.value);
  //   setRegion(e.target.value || 'US');
  //   const languageByRegion = [
  //     { region: 'AR', language: 'es-ES' },
  //     { region: 'ES', language: 'es-ES' },
  //     { region: 'US', language: 'en-US' },
  //     { region: 'BR', language: 'pt-BR' },
  //   ];
  //   const changeLanguage = languageByRegion.find(
  //     (item) => item.region === e.target.value
  //   )?.language;
  //   setLanguage(changeLanguage);
  // };

  return (
    <div className="py-5 bg-transparent">
      <div className="container">
        <div className="flex">
          {/** Navigation */}
          <div className="relative flex flex-wrap items-center justify-start p-0 w-2/3">
            <div className="leading-5 relative">
              <Link to="/">
                <ReactLogo className="h-6 dark:fill-slate-100" />
              </Link>
            </div>
            <ul className="flex ml-10 mt-1 gap-5">
              <li>
                <NavLink
                  to="/movies"
                  className="leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-500 transition-colors"
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tv"
                  className="leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-500 transition-colors"
                >
                  Series
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upcoming"
                  className="leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-500 transition-colors"
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-500 transition-colors">
                      Genres
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
                    <Menu.Items className="absolute w-96 mt-2 -right-[12rem] origin-top bg-white dark:bg-slate-700 divide-y divide-slate-100 dark:divide-slate-900 rounded-md border border-slate-200 shadow-lg focus:outline-none z-50">
                      <div className="grid grid-cols-3 p-2">
                        {/* <div className="px-1 py-1 "> */}
                        {genres.results.length > 0 &&
                          genres.results.map((item) => (
                            <Menu.Item key={item.id}>
                              {({ active }) => (
                                <Link
                                  to={`/genre/${item.id}`}
                                  className={`${
                                    active
                                      ? 'bg-cyan-500 text-white'
                                      : 'text-slate-500 dark:text-slate-400'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors`}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            </ul>
          </div>
          {/** Menu right */}
          <div className="relative flex flex-wrap items-center justify-end p-0 w-1/3 space-x-4">
            {/* <select name="region" onChange={handleChangeRegion}>
              <option value="AR">Argentina</option>
              <option value="US">EEUU</option>
              <option value="ES">España</option>
              <option value="BR">Brasil</option>
            </select> */}

            <FormSearch />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center hover:opacity-80">
                  <AvatarLetter />
                </Menu.Button>
              </div>
              <div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-slate-700 divide-y divide-slate-100 dark:divide-slate-900 rounded-md shadow-lg focus:outline-none z-50">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-cyan-500 text-white'
                                : 'text-slate-900 dark:text-slate-400'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <UserIcon
                                className="w-5 h-5 mr-2 text-cyan-200"
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
                              active
                                ? 'bg-cyan-500 text-white'
                                : 'text-slate-900 dark:text-slate-400'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <HeartIcon
                                className="w-5 h-5 mr-2 text-cyan-200"
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
                              active
                                ? 'bg-cyan-500 text-white'
                                : 'text-slate-900 dark:text-slate-400'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <CollectionIcon
                                className="w-5 h-5 mr-2 text-cyan-200"
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
                              active
                                ? 'bg-cyan-500 text-white'
                                : 'text-slate-900 dark:text-slate-400'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <LogoutIcon
                                className="w-5 h-5 mr-2 text-cyan-200"
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

                      <Menu.Item>
                        <div className="flex items-center p-2 space-x-2 text-sm">
                          <Switch
                            checked={darkMode}
                            onChange={setDarkMode}
                            className={`${darkMode ? 'bg-cyan-700' : 'bg-cyan-500'}
          relative inline-flex flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200`}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={`${darkMode ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                            />
                          </Switch>
                          <span>Mode Dark</span>
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
