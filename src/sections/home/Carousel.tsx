import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { SpinnerCarousel } from '@/components/Spinner';
import { CarouselItem } from './CarouselItem';

import { Media } from '@/types/home';

interface CarouselProps {
  listing: Media[];
  isLoading: boolean;
}

export const Carousel = ({ listing, isLoading }: CarouselProps) => {
  return (
    <div className="home-carousel">
      {isLoading ? (
        <SpinnerCarousel />
      ) : (
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay
          spaceBetween={16}
          slidesPerView={1}
          loop
          loopAdditionalSlides={1}
          pagination={{ clickable: true }}
        >
          {listing &&
            listing.map((item) => (
              <SwiperSlide key={item.id}>
                <CarouselItem {...item} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
