import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/solid';

function CardSerie({ id, title, overview, poster, vote, date, language }) {
  const handleFavorite = (e, id) => {
    e.preventDefault();
    console.log('tocando favourite serie id ' + id);
  };

  return (
    <>
      <Link
        to={`/movies/${id}`}
        className="w-full bg-black relative overflow-hidden rounded-md group flex flex-col min-h-[32rem]"
      >
        <div className="relative overflow-hidden max-h-80">
          <img
            src={poster}
            alt={title}
            className="w-full block group-hover:scale-105 transition-transform duration-300"
          />
          <div
            className="absolute z-20 top-4 right-4 transition-all opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
            onClick={(e) => handleFavorite(e, id)}
          >
            <div className="p-2 transition-all rounded-full bg-gray-700 bg-opacity-50 text-white hover:bg-rose-600 active:scale-90 focus:bg-rose-600 ">
              <HeartIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 w-full h-1/3 group-hover:h-1/6 bg-gradient-to-t from-black to-transparent transition-all duration-500"></div>
        </div>
        <div className="p-4 z-10 relative flex flex-1 flex-col justify-between">
          <div className="">
            <h2 className="text-lg font-semibold text-white mb-3 whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
              {title} <span className="ml-1 text-xs text-gray-600">{language}</span>
            </h2>
            <p className="text-sm text-gray-300 my-3">{overview}</p>
          </div>
          <div className="flex w-full items-center gap-4">
            <span className="text-sm text-white font-semibold">{date}</span>
            <span
              className={`ml-auto text-sm text-white font-black bg-gray-800 px-2 py-1 rounded-md ${vote?.class}`}
            >
              {vote?.count}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardSerie;
