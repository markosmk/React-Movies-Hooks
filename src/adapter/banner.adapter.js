import { OPTIONS_DATE, BACKDROP_780, BACKDROP_NOT_IMAGE } from 'config';
import { checkStatus, getClassByRate, truncateOverview } from 'helpers';

export const adapterBannerCarousel = (listing, language = 'en-US') => {
  return listing.map((item) => {
    const dateRelease = item.release_date ? item.release_date : item.first_air_date; // for movie or tv
    return {
      id: item.id,
      title: item.title ? item.title : item.name,
      overview: truncateOverview(item.overview, 185),
      backdrop: item.backdrop_path ? BACKDROP_780 + item.backdrop_path : BACKDROP_NOT_IMAGE,
      vote: {
        count: item.vote_average.toFixed(1),
        class: getClassByRate(item.vote_average),
      },
      date: new Date(dateRelease).toLocaleDateString(language, OPTIONS_DATE),
      status: checkStatus(dateRelease),
    };
  });
};
