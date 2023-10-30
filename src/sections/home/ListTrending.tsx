import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';

import { Media } from '@/types/home';

import { CardMovie } from '@/components/CardMovie';
import { SpinnerCard } from '@/components/Spinner';

interface ListTrendingProps {
  listing: Media[];
  isLoading: boolean;
}

export const ListTrending = ({ listing, isLoading }: ListTrendingProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold my-6">Trending TV shows</h2>
      {isLoading ? (
        <SpinnerCard count={4} />
      ) : (
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          modules={[Autoplay]}
          autoplay
          breakpoints={{
            // when window width is >= 640px
            640: {
              // width: 640,
              spaceBetween: 16,
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              // width: 768,
              spaceBetween: 16,
              slidesPerView: 3,
            },
            1024: {
              // width: 768,
              spaceBetween: 16,
              slidesPerView: 4,
            },
          }}
        >
          {listing &&
            listing.map((item) => (
              <SwiperSlide key={item.id}>
                <CardMovie {...item} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
};
