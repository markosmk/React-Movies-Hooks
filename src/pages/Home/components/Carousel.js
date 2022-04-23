import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CarouselItem from './CarouselItem';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { SpinnerCarousel } from 'components/Spinner';

function Carousel({ listing, isLoading }) {
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
}

export default Carousel;
