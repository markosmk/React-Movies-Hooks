import { Menu, Transition } from '@headlessui/react';
import { Fragment, memo } from 'react';
import { Link, NavLink } from 'react-router-dom';

function MenuLinks({ className = '', genres }) {
  return (
    <ul className={className}>
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
      {genres && (
        <li className="">
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
              <Menu.Items className="absolute w-96 mt-2 -right-[12rem] origin-top bg-white dark:bg-slate-700 divide-y divide-slate-100 dark:divide-slate-900 rounded-md border border-slate-200 dark:border-slate-900 shadow-lg focus:outline-none z-50">
                <div className="grid grid-cols-3 p-2">
                  {/* <div className="px-1 py-1 "> */}
                  {genres.results.length > 0 &&
                    genres.results.map((item) => (
                      <Menu.Item key={item.id}>
                        {({ active }) => (
                          <Link
                            to={`/genre/${item.id}`}
                            className={`${
                              active ? 'bg-cyan-500 text-white' : 'text-slate-500 dark:text-slate-400'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors truncate`}
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
      )}
    </ul>
  );
}

export default memo(MenuLinks);
