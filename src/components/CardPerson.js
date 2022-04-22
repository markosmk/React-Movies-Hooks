import { useState } from 'react';
import { Link } from 'react-router-dom';

import SpinnerIcon from './icons/SpinnerIcon';

function CardPerson({ id, name, gender, known_for_department, known_for, avatar }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Link
        to={`/person/${id}`}
        className="w-full bg-black relative overflow-hidden rounded-md group flex flex-col min-h-max select-none"
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
          <div className="absolute left-0 bottom-0 w-full h-1/3 group-hover:h-1/6 bg-gradient-to-t from-black to-transparent transition-all duration-500"></div>
        </div>
        <div className="-mt-8 p-4 z-10 relative flex flex-1 flex-col justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
              {name}
              <span className="ml-2 text-xs uppercase text-slate-600">{gender}</span>
            </h2>
          </div>
          <div className="flex w-full place-items-center border-b pb-1 border-slate-700">
            <span className="text-xs sm:text-sm text-slate-400 font-semibold">
              {known_for_department}
            </span>
          </div>
          <div className="text-slate-400 leading-6 mt-1 hidden sm:block">
            <span className="text-xs sm:text-sm font-semibold">Known for:</span>
            <div className="flex flex-col text-xs">
              {known_for &&
                known_for.slice(0, 3).map((item) => (
                  <span className="truncate" key={item.id}>
                    - {item.title}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardPerson;
