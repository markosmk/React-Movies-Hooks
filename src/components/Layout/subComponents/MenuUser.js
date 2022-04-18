import { Menu, Transition } from '@headlessui/react';
import { CollectionIcon, HeartIcon, LogoutIcon, UserIcon } from '@heroicons/react/solid';
import AvatarLetter from 'components/AvatarLetter';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function MenuUser({ user, handleLogout }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center hover:opacity-80">
          <AvatarLetter name={user ? user.name || user.email : ''} />
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
            {user ? (
              <>
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/me"
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
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/favorites"
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
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/recomendations"
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
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleLogout}
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
                </div>
              </>
            ) : (
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
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
                      Login
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/register"
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
                      Register
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
}

export default MenuUser;
