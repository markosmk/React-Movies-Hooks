import { HeartIcon } from '@heroicons/react/solid';
import SpinnerIcon from 'components/icons/SpinnerIcon';
import { useEffect, useRef, useState } from 'react';
import useStore from 'store';

function LikeItem({ id, poster, type, likesUser }) {
  const setFavorite = useStore((state) => state.setFavorite);
  const checkFavorite = useStore((state) => state.checkFavorite);
  const user = useStore((state) => state.auth.user);

  const [fav, setFav] = useState(checkFavorite(id, type));
  const [favLoading, setFavLoading] = useState(false);

  let isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleFavorite = async (e, obj) => {
    e.preventDefault();
    if (!user) return alert('Debes estar logueado');

    console.log('tocando favourite id ' + obj.id);

    try {
      setFavLoading(true);
      await setFavorite(obj);
      if (isMounted.current) {
        setFavLoading(false);
        setFav(!fav);
      } else {
        isMounted = null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`absolute z-20 top-4 right-4 transition-all ${
        fav
          ? 'scale-100 opacity-100'
          : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
      } ${favLoading && 'select-none pointer-events-none'}`}
      onClick={(e) =>
        handleFavorite(e, {
          id,
          poster,
          type,
        })
      }
    >
      <div
        className={`p-2 transition-all rounded-full ${
          fav ? 'bg-rose-600' : 'bg-slate-700 bg-opacity-50'
        } text-white hover:bg-rose-600 active:scale-90 focus:bg-rose-600`}
      >
        {favLoading ? (
          <SpinnerIcon measure="h-5 w-5" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
      </div>
    </div>
  );
}

export default LikeItem;
