import { AVATAR_185, AVATAR_NOT_IMAGE, POSTER_342, POSTER_NOT_IMAGE } from 'config';
import { getClassByRate, truncateOverview } from 'helpers';

export const adapterCardMovie = (listing, media_type = 'movie', language = 'en-US') => {
  return listing.map((item) => {
    const dateRelease = item.release_date || item.first_air_date || null; // for movie or tv
    return {
      id: item.id,
      title: item.title ? item.title : item.name,
      overview: truncateOverview(item.overview, 100),
      poster: item.poster_path ? `${POSTER_342 + item.poster_path}` : POSTER_NOT_IMAGE,
      vote: {
        count: item.vote_average.toFixed(1),
        class: getClassByRate(item.vote_average),
      },
      date:
        dateRelease &&
        new Date(dateRelease).toLocaleDateString(language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      language: item.original_language,
      type: item.first_air_date || item.original_name ? 'tv' : media_type, // tv person movie
    };
  });
};

export const adapterCardPerson = (listing, language = 'en-US') => {
  return listing.map((item) => {
    return {
      id: item.id,
      gender: item.gender === 1 ? 'Female' : 'Male',
      name: item.name,
      avatar: item.profile_path ? AVATAR_185 + item.profile_path : AVATAR_NOT_IMAGE,
      known_for_department: item.known_for_department,
      type: 'person',
      known_for: adapterCardMovie(item.known_for, 'movie', language),
    };
  });
};
