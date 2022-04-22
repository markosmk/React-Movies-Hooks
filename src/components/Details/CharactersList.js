import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Link } from 'react-router-dom';

function CharactersList({ credits }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-8">The Cast</h2>
      <div>
        <Swiper
          spaceBetween={12}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 640px
            640: {
              // width: 640,
              spaceBetween: 12,
              slidesPerView: 4,
            },
            // when window width is >= 768px
            768: {
              // width: 768,
              spaceBetween: 12,
              slidesPerView: 5,
            },
            1024: {
              // width: 768,
              spaceBetween: 16,
              slidesPerView: 7,
            },
          }}
        >
          {credits &&
            credits.map(({ id, name, character, avatar }, idx) => (
              <SwiperSlide key={id + '-' + idx}>
                <Link
                  to={`/person/${id}`}
                  className="relative text-center flex flex-col items-center hover:opacity-80 transition-opacity "
                >
                  <div className="block w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 overflow-hidden rounded-full">
                    <img
                      src={avatar}
                      alt="img"
                      className="block w-full rounded-full -mt-4"
                    />
                  </div>
                  <span className="mt-3 block text-slate-600 dark:text-slate-400 font-semibold text-sm">
                    {name}
                  </span>
                  <span className="mt-1 block text-slate-400 dark:text-slate-500 font-medium text-xs">
                    {character}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CharactersList;
