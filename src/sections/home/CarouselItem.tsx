import Link from 'next/link';

import { Score } from '@/components/Score';
import { Media } from '@/types/home';

export const CarouselItem = ({ id, title, overview, backdrop, vote, date, status }: Media) => {
  return (
    <div className="overflow-hidden relative w-full rounded-lg bg-black h-64 sm:h-96 lg:h-128 flex items-end">
      <div className="w-auto sm:w-1/5 md:w-3/5 select-none">
        <div className="absolute bottom-5 lg:bottom-10 left-5 lg:left-10 z-10 w-full md:w-3/5">
          <Link href={`/movie/${id}`}>
            <h2
              className={`text-3xl md:text-4xl uppercase text-white font-bold tracking-wide ${
                title.length > 20 ? 'lg:text-5xl' : 'lg:text-6xl'
              }`}
            >
              {title}
            </h2>
          </Link>

          <div className="my-3 flex items-center">
            <div className="hidden md:flex mr-2 md:mr-4">
              <Score vote={vote} text="IMDB" url="" />
            </div>
            <span className="text-sm text-gray-400 mr-2 md:mr-4">
              <b className="text-white">{status}</b>
            </span>
            <span className="text-sm text-slate-400">{date}</span>
          </div>

          <p className="my-3 text-sm leading-7 hidden text-gray-400 w-3/5 md:flex">{overview}</p>

          <Link
            href={`/movie/${id}`}
            className="text-white max-w-52 bg-slate-500 leading-8 rounded-md px-6 py-2 items-center justify-center hover:bg-cyan-500 transition-colors hidden lg:inline-flex"
          >
            See Details
          </Link>
        </div>
      </div>
      <div
        className="w-full sm:w-4/5 md:w-3/5 relative h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${backdrop}')`,
        }}
      >
        <div className="absolute top-0 left-0 w-4/5 sm:w-3/5 h-full group-hover:h-1/5 bg-gradient-to-r from-black transition-all"></div>
      </div>
    </div>
  );
};

export default CarouselItem;
