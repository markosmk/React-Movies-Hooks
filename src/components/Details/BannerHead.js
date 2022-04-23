import { useState } from 'react';
import { Link } from 'react-router-dom';
import Score from 'components/Score';
import ModalVideo from 'components/ModalVideo';

function BannerHead({ detail }) {
  const [isOpen, setOpen] = useState(false);
  const [loaderPoster, setLoaderPoster] = useState(false);

  if (!detail) return null;

  // TODO: add option for add favorite movie or tv serie

  return (
    <>
      <div className="overflow-hidden relative w-full rounded-lg h-128 flex items-end">
        <div className="w-full md:w-4/6 absolute px-4 pb-4 md:pl-10 md:pb-10 z-10">
          <h2
            className={`text-3xl md:text-4xl uppercase text-white font-bold tracking-wide ${
              detail.title?.length > 20 ? 'lg:text-5xl' : 'lg:text-6xl'
            }`}
          >
            {detail.title}
          </h2>
          <div className="my-4 space-x-4 flex items-center">
            <Score vote={detail.vote} text="IMDb" url={detail.urlImdb} />
            <span className="text-sm text-slate-400">
              <b className="text-white">{detail.status}</b>
            </span>
            <span className="text-sm text-slate-400">{detail.year}</span>
            <span className="text-sm text-slate-400">
              <b className="text-white">{detail.runtime}</b>
            </span>
          </div>

          <p className="my-4 text-md leading-7 italic text-slate-300">{detail.tagline}</p>
          <p className="my-4 text-sm leading-7 text-slate-400">{detail.overview_short}</p>
          <div className="mt-4 text-sm leading-7 text-slate-400 space-x-4 flex flex-wrap">
            {detail.genres.length > 0 &&
              detail.genres.map((item) => (
                <Link to={`/genre/${item.id}`} key={item.id}>
                  <span className="text-slate-300 py-0 px-2 mb-2 block rounded-md bg-slate-600 hover:bg-cyan-600 hover:text-cyan-100 transition-colors">
                    {item.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
        <div className="w-full relative h-full">
          {detail.video ? (
            <div
              className="hidden lg:block absolute top-8 right-8 z-10 group cursor-pointer"
              onClick={setOpen}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white group-hover:scale-150 group-hover:text-red-600 transition-all z-20 duration-500">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <img
                src={detail.poster}
                className="rounded-lg max-h-[28rem] h-[28rem] group-hover:scale-[.98] duration-500 group-hover:grayscale transition-all"
                alt="poster movie"
              />
            </div>
          ) : (
            <img
              src={detail.poster}
              className="rounded-lg max-h-[28rem] h-[28rem] shadow-md hidden lg:block absolute top-8 right-8 z-10 "
              alt="poster movie"
            />
          )}

          <img
            className="hidden"
            src={detail.backdrop}
            onLoad={() => setLoaderPoster(true)}
            alt="hidden backdrop"
          />
          <div className="overflow-hidden h-full w-full bg-black">
            <div
              className="w-full md:w-1/2 lg:w-full md:ml-auto relative h-1/2 md:h-full bg-cover bg-center lg:blur-md"
              style={{
                backgroundImage: `url(${detail.backdrop})`,
                opacity: loaderPoster ? '0.75' : '0',
                transition: 'all 1s ease-in',
              }}
            >
              {/** background image */}
              <div className="hidden md:block absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-black"></div>
              <div className="block md:hidden absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black"></div>
            </div>
          </div>
        </div>
      </div>
      {detail.video && (
        <ModalVideo
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          videoId={detail.video.key}
        />
      )}
    </>
  );
}

export default BannerHead;
