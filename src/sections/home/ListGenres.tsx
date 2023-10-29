import { memo } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { SpinnerGenres } from '@/components/Spinner';

interface ListGenresProps {
  listing: any;
  isLoading: boolean;
}

export const ListGenres = memo(({ listing, isLoading }: ListGenresProps) => {
  const gradientCss = [
    'bg-gradient-to-tr from-cyan-500 to-blue-500',
    'bg-gradient-to-tr from-sky-500 to-indigo-500',
    'bg-gradient-to-tr from-violet-500 to-fuchsia-500',
    'bg-gradient-to-tr from-purple-500 to-pink-500',
    'bg-gradient-to-tr from-red-500 to-yellow-500',
    'bg-gradient-to-tr from-green-500 to-sky-500',
  ];
  return (
    <>
      <h2 className="text-2xl font-semibold my-6">Available Genres</h2>
      {isLoading ? (
        <SpinnerGenres />
      ) : (
        <Swiper
          spaceBetween={12}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 640px
            640: {
              spaceBetween: 12,
              slidesPerView: 4,
            },
            // when window width is >= 768px
            768: {
              spaceBetween: 12,
              slidesPerView: 5,
            },
            1024: {
              spaceBetween: 16,
              slidesPerView: 6,
            },
          }}
        >
          {listing &&
            listing.map(({ id, name }) => {
              let randomnumber = Math.floor(Math.random() * gradientCss.length);
              return (
                <SwiperSlide key={id}>
                  <Link
                    href={`/genre/${id}`}
                    className={`w-full text-center flex items-center justify-center rounded-md h-12 md:h-20 transition-all hover:opacity-90 active:scale-95 ${gradientCss[randomnumber]}`}
                  >
                    <span className="font-semibold text-sm text-white">{name}</span>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </>
  );
});
