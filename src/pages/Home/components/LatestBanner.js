import { Link } from 'react-router-dom';

function LatestBanner({ listing }) {
  return (
    <>
      <h2 className="text-2xl font-semibold my-6">TV shows Airing Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listing &&
          listing.map(({ id, title, overview, date, backdrop, vote }) => {
            return (
              <Link
                to={`/tv/${id}`}
                key={id}
                className=" bg-black rounded-md relative overflow-hidden w-full flex flex-col h-56 group"
              >
                <span
                  className={`absolute top-4 right-4 z-10 text-2xl text-white font-semibold bg-slate-800 bg-opacity-25 px-2 py-1 rounded-t-md ${vote?.class}`}
                >
                  {vote?.count}
                </span>

                <div className="absolute left-4 right-10 bottom-4 z-10">
                  <div className="flex items-center space-x-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                    </span>
                    <h2 className="inline-flex text-2xl leading-none text-white font-bold tracking-wide">
                      {title}
                    </h2>
                  </div>
                  <div className="my-4 space-x-4 content-end">
                    <span className="text-sm text-slate-200">
                      <b className="">{date}</b>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-slate-300">
                    {overview}
                  </p>
                </div>

                <div className="relative block overflow-hidden group-hover:before:w-5/6 before:w-full before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-transparent before:z-0 before:transition-all before:duration-300">
                  <img
                    src={backdrop}
                    alt={title}
                    className="w-full block transition-transform duration-300"
                  />
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default LatestBanner;
