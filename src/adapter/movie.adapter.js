import { AVATAR_45 } from 'config';
import { AVATAR_NOT_IMAGE } from 'config';
import {
  BACKDROP_780,
  POSTER_342,
  AVATAR_NOT_IMAGE_MAN,
  AVATAR_NOT_IMAGE_WOMAN,
  AVATAR_185,
  BACKDROP_NOT_IMAGE,
  POSTER_NOT_IMAGE,
} from 'config';
import { convertMinsToHrsMins, getClassByRate } from 'helpers';

export const adapterCreditsCast = (listing) => {
  return listing.map((item) => {
    const notAvatar = item.gender === 1 ? AVATAR_NOT_IMAGE_WOMAN : AVATAR_NOT_IMAGE_MAN;
    return {
      id: item.id,
      name: item.name,
      original_name: item.original_name,
      character: item.character,
      avatar: item.profile_path ? `${AVATAR_185 + item.profile_path}` : notAvatar,
    };
  });
};

export const adapterDetail = (detail, type, language) => {
  const dateRelease = detail.release_date || detail.first_air_date || null; // for movie or tv

  // cambiar reduce por filter
  const groupAndMerge = (arr, groupBy, mergeInto) =>
    Array.from(
      arr
        .reduce((m, o) => {
          const curr = m.get(o[groupBy]);
          return m.set(o[groupBy], {
            id: o.id,
            name: o.name,
            department: o.department,
            [mergeInto]: [...((curr && curr[mergeInto]) || []), o[mergeInto]],
          });
        }, new Map())
        .values()
    );

  const getProduction = () => {
    const listCrew = detail.credits.crew.filter(
      (item) => item.job === 'Story' || item.job === 'Director' || item.job === 'Screenplay'
    );
    return groupAndMerge(listCrew, 'name', 'job');
  };
  // options alternate with for
  /*
  const forAndMerge = (listing) => {
    let result = [];
    for (let i = 0; i <= listing.length - 1; i += 1) {
      const item = listing[i];
      if (item.job === 'Story' || item.job === 'Director' || item.job === 'Screenplay') {
        const hayUno = result.find((ite) => ite.name === item.name);
        if (hayUno) {
          hayUno.job = [...hayUno.job, item.job];
        } else {
          const itemFinal = {
            id: item.id,
            name: item.name,
            department: item.department,
            avatar: item.profile_path ? AVATAR_185 + item.profile_path : notAvatar,
            job: [item.job],
          };
          result = [...result, itemFinal];
        }
      }
    }
    return result;
  };
  */

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

  // for defaul en-US
  const overviewEn = (value) => {
    const findTranslation = detail.translations.translations.find((item) => item.iso_3166_1 === 'US');
    return findTranslation.data[value];
  };

  return {
    id: detail.id,
    status: detail.status,
    budget: detail.budget ? formatter.format(detail.budget) : '-',
    revenue: detail.revenue ? formatter.format(detail.revenue) : '-',
    genres: detail.genres,
    title: detail.title || detail.name, // for movie or tvshow
    homepage: detail.homepage || overviewEn('homepage'),
    tagline: detail.tagline || overviewEn('tagline'),
    overview: detail.overview || overviewEn('overview'),
    // popularity: detail.popularity, // not used
    video: detail.videos.results.find((item) => item.site === 'YouTube') ?? false,
    urlImdb: detail.imdb_id && `https://www.imdb.com/title/${detail.imdb_id}/`,
    language: detail.original_language,
    original_title: detail.original_title || detail.original_name,
    backdrop: detail.backdrop_path ? BACKDROP_780 + detail.backdrop_path : BACKDROP_NOT_IMAGE,
    poster: detail.poster_path ? POSTER_342 + detail.poster_path : POSTER_NOT_IMAGE,
    date:
      dateRelease &&
      new Date(dateRelease).toLocaleDateString(language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    year: dateRelease && new Date(dateRelease).getFullYear().toString(),
    vote: {
      count: detail.vote_average.toFixed(1),
      count_detail: detail.vote_count,
      class: getClassByRate(detail.vote_average),
    },
    runtime: detail.runtime ? convertMinsToHrsMins(detail.runtime) : '', // only movie
    crew: detail.credits.crew,
    written: detail.credits.crew.filter((item) => item.department === 'Writing'),
    director: type === 'movie' ? getProduction().find((item) => item.job.includes('Director')) : null, // only movie
    created:
      type === 'tv'
        ? detail.created_by.length > 0 && {
            name: detail.created_by[0].name,
            id: detail.created_by[0].id,
          }
        : null, // only tv
    production_companies: detail.production_companies || '-',
    production_countries: detail.production_countries || '-',
    spoken_languages: detail.spoken_languages.length !== 0 && detail.spoken_languages[0],
  };
};

export const adapterReviews = (listing, language) => {
  return listing.map((item) => {
    const url_avatar = (avatar_path) => {
      if (avatar_path) {
        if (avatar_path.indexOf('/http') === 0) {
          return avatar_path.slice(1);
        } else {
          return AVATAR_45 + avatar_path;
        }
      } else {
        return AVATAR_NOT_IMAGE;
      }
    };

    return {
      id: item.id,
      name: item.author || item.author_details.username,
      avatar: url_avatar(item.author_details.avatar_path),
      date:
        item.created_at &&
        new Date(item.created_at).toLocaleDateString(language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) +
          ' | ' +
          item.updated_at &&
        new Date(item.updated_at).toLocaleDateString(language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      content: item.content,
      url: item.url,
    };
  });
};
