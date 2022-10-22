import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { CollectionIcon, HeartIcon, LogoutIcon, UserIcon } from '@heroicons/react/solid';

import AvatarLetter from 'components/AvatarLetter';

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
          <Menu.Items className="absolute right-0 w-60 mt-2 origin-top-right bg-white border-slate-200 dark:border-slate-800 border dark:bg-slate-700 divide-y divide-slate-100 dark:divide-slate-900 rounded-md shadow-lg focus:outline-none z-50">
            <div className="px-4 pt-3 pb-1">
              {/* select region */}
              <div className="flex items-center justify-between flex-shrink-0 w-full h-8 space-x-4 text-sm text-left rounded cursor-base focus:outline-none mb-2">
                <label htmlFor="region" className="block text-sm font-medium text-slate-900 dark:text-slate-400">
                  Region
                </label>
                <select
                  id="region"
                  disabled
                  className="bg-slate-50 border-2 border-slate-300 text-slate-900 text-sm rounded-md focus:ring-cyan-500 focus:border-cyan-500 block w-full p-1 dark:bg-slate-700 dark:border-slate-800 dark:placeholder-slate-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                >
                  <option value="AR">Argentina</option>
                  <option value="BR">Brazil</option>
                  <option value="CL">Chile</option>
                  <option value="CO">Colombia</option>
                  <option value="US">EE.UU.</option>
                  <option value="DE">Germany</option>
                  <option value="ES">Spain</option>
                </select>
              </div>

              {/* select language */}
              <div className="flex items-center justify-between flex-shrink-0 w-full h-8 space-x-4 text-sm text-left rounded cursor-base focus:outline-none mb-1">
                <label htmlFor="language" className="block text-sm font-medium text-slate-900 dark:text-slate-400">
                  Language
                </label>
                <select
                  id="language"
                  disabled
                  className="bg-slate-50 border-2 border-slate-300 text-slate-900 text-sm rounded-md focus:ring-cyan-500 focus:border-cyan-500 block w-full p-1 dark:bg-slate-700 dark:border-slate-800 dark:placeholder-slate-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                >
                  <option value="es-ES">Spanish</option>
                  <option value="en-US">English</option>
                  <option value="pt-BR">Portuguese</option>
                </select>
              </div>
              {/* change theme style dark / light */}
              <div className="flex items-center justify-between flex-shrink-0 w-full h-10 text-sm text-left rounded cursor-base focus:outline-none">
                <span className="block text-sm font-medium text-slate-900 dark:text-slate-400">Theme Style</span>

                <label htmlFor="theme-toggle" className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" disabled value="" id="theme-toggle" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>

            {user ? (
              <>
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/me"
                        className={`${
                          active ? 'bg-cyan-500 text-white' : 'text-slate-900 dark:text-slate-400'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <UserIcon className="w-5 h-5 mr-2 text-cyan-200" aria-hidden="true" />
                        ) : (
                          <UserIcon className="w-5 h-5 mr-2 text-slate-400" aria-hidden="true" />
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
                          active ? 'bg-cyan-500 text-white' : 'text-slate-900 dark:text-slate-400'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <HeartIcon className="w-5 h-5 mr-2 text-cyan-200" aria-hidden="true" />
                        ) : (
                          <HeartIcon className="w-5 h-5 mr-2 text-slate-400" aria-hidden="true" />
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
                          active ? 'bg-cyan-500 text-white' : 'text-slate-900 dark:text-slate-400'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <CollectionIcon className="w-5 h-5 mr-2 text-cyan-200" aria-hidden="true" />
                        ) : (
                          <CollectionIcon className="w-5 h-5 mr-2 text-slate-400" aria-hidden="true" />
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
                          active ? 'bg-cyan-500 text-white' : 'text-slate-900 dark:text-slate-400'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <LogoutIcon className="w-5 h-5 mr-2 text-cyan-200" aria-hidden="true" />
                        ) : (
                          <LogoutIcon className="w-5 h-5 mr-2 text-slate-400" aria-hidden="true" />
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
                        active ? 'bg-cyan-500 text-white' : 'text-slate-900 dark:text-slate-400'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <UserIcon className="w-5 h-5 mr-2 text-cyan-200" aria-hidden="true" />
                      ) : (
                        <UserIcon className="w-5 h-5 mr-2 text-slate-400" aria-hidden="true" />
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
                        active ? 'bg-cyan-500 text-white' : 'text-slate-900 dark:text-slate-400'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <HeartIcon className="w-5 h-5 mr-2 text-cyan-200" aria-hidden="true" />
                      ) : (
                        <HeartIcon className="w-5 h-5 mr-2 text-slate-400" aria-hidden="true" />
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
