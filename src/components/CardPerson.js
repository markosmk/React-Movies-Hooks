import { useState } from 'react';
import { Link } from 'react-router-dom';

import { HeartIcon } from '@heroicons/react/solid';
import SpinnerIcon from './icons/SpinnerIcon';

function CardPerson({ id, name, gender, known_for_department, known_for, avatar }) {
  const handleFavorite = (e, id) => {
    e.preventDefault();
    console.log('tocando favourite id ' + id);
  };
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Link
        to={`/person/${id}`}
        className="w-full bg-black relative overflow-hidden rounded-md group flex flex-col min-h-max sm:min-h-[30rem] select-none"
      >
        <div className="relative overflow-hidden max-h-80">
          <div
            className="flex justify-center items-center h-80 bg-slate-700"
            style={{ display: loading ? 'flex' : 'none' }}
          >
            <SpinnerIcon />
          </div>
          <div style={{ display: loading ? 'none' : 'block' }}>
            <img
              src={avatar}
              alt={name}
              className="w-full block group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setLoading(false)}
            />
          </div>
          <div
            className="absolute z-20 top-4 right-4 transition-all opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
            onClick={(e) => handleFavorite(e, id)}
          >
            <div className="p-2 transition-all rounded-full bg-slate-700 bg-opacity-50 text-white hover:bg-rose-600 active:scale-90 focus:bg-rose-600 ">
              <HeartIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 w-full h-1/3 group-hover:h-1/6 bg-gradient-to-t from-black to-transparent transition-all duration-500"></div>
        </div>
        <div className="-mt-8 p-4 z-10 relative flex flex-1 flex-col justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-3 whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
              {name}
            </h2>
            <p className="text-sm text-slate-400 leading-6 my-3 hidden sm:flex">
              {gender}
            </p>
          </div>
          <div className="flex w-full items-center gap-4">
            <span className="text-xs sm:text-sm text-slate-400 sm:text-white font-semibold">
              {known_for_department}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardPerson;