import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import HeaderPage from 'components/HeaderPage';
import { SpinnerCard } from 'components/Spinner';

import useStore from 'store';
import shallow from 'zustand/shallow';

function Favorites() {
  const favorites = useStore((state) => state.auth.favorites, shallow);
  const getFavorites = useStore((state) => state.getFavorites, shallow);
  const setFavorite = useStore((state) => state.setFavorite);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (e, itemDel) => {
    setDeleting(itemDel.id);
    setFavorite(itemDel).then(() => {
      setDeleting(false);
    });
  };

  // TODO: check because the array list is sorted when is mounted

  return (
    <div>
      <HeaderPage
        title="My Favorites"
        description="All favorites you has saved, order by last added first"
      />
      <div className="container">
        {favorites.length === 0 && <SpinnerCard count={4} />}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full my-4">
          {favorites.length > 0 &&
            favorites.map((item, idx) => {
              return (
                <div
                  key={item.id + idx}
                  className={`rounded-lg overflow-hidden transition-all ${
                    deleting === item.id && 'scale-[0.98] opacity-75'
                  }`}
                >
                  <Link to={`/${item.type}/${item.id}`} className=" text-white group">
                    <div className="h-auto sm:h-80 overflow-hidden rounded-t-lg relative">
                      <div className="absolute top-3 right-3 text-slate-200 font-semibold text-sm px-3 py-1 bg-slate-800 bg-opacity-50 rounded-lg z-20">
                        {item.type}
                      </div>
                      <img
                        src={item.poster}
                        alt="poster movie or tv"
                        className="w-full group-hover:scale-105 transition-all"
                      />
                      <div className="absolute left-0 right-0 h-1/3 group-hover:h-1/5  transition-all bottom-0 bg-gradient-to-t from-black"></div>
                    </div>
                    <div className="p-3 bg-black">
                      <p className="text-sm overflow-ellipsis whitespace-nowrap">
                        <b>Saved: </b>
                        <TimeAgo date={new Date(item.created_at)} />
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center text-sm bg-slate-800">
                    <Link
                      to={`/${item.type}/${item.id}`}
                      className="bg-slate-800 w-full py-3 text-center hover:bg-cyan-600  text-slate-300 transition-colors"
                    >
                      See Details
                    </Link>
                    <button
                      onClick={(e) => handleDelete(e, item)}
                      className="bg-slate-800 w-full py-3 hover:bg-rose-700  text-slate-300 hover:text-white transition-colors "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
