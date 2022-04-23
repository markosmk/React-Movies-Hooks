/**
 * Constants Images
 */
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
// for posters_sizes - available "w92","w154","w185","w342","w500","w780", "original"
const POSTER_342 = IMAGE_BASE_URL + '/w342';
const POSTER_NOT_IMAGE = '/assets/noposter.svg';
// for profile_sizes: "w45", "w185", "h632", "original"
const AVATAR_45 = IMAGE_BASE_URL + '/w45';
const AVATAR_185 = IMAGE_BASE_URL + '/w185';
const AVATAR_632 = IMAGE_BASE_URL + '/h632';
const AVATAR_NOT_IMAGE = '/assets/nogender0.svg';
const AVATAR_NOT_IMAGE_WOMAN = '/assets/nogender1.svg';
const AVATAR_NOT_IMAGE_MAN = '/assets/nogender2.svg';
// for backdrop_sizes - available "w300", "w780", "w1280", "original",
const BACKDROP_780 = IMAGE_BASE_URL + '/w780';
const BACKDROP_NOT_IMAGE = '/assets/nocarousel.svg';
// for logos_sizes - "w45", "w92", "w154", "w185", "w300", "w500", "original"
const LOGO_45 = IMAGE_BASE_URL + '/w45';
const LOGO_NOT_IMAGE = 'https://placeholder.pics/svg/45x45';
// date format
const OPTIONS_DATE = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

/**
 * Helpers Functions
 */
const getClassByRate = (vote) => {
  return vote >= 7
    ? 'text-green-500 stroke-green-500'
    : vote >= 5
    ? 'text-yellow-500 stroke-yellow-500'
    : 'text-red-500 stroke-red-500';
};

const truncateOverview = (string = '', maxLength = 50) => {
  return string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;
};

const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}h ${m}m`;
};

const checkStatus = (release) => {
  const now = new Date();
  const date_release = new Date(release);
  return now !== date_release && 'Released';
};

const sortByDate = (a, b) => {
  if (a.hasOwnProperty('date')) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
  }
  return 0;
};

/**
 * Views order data
 */
const viewsForBannerCarousel = (listing, language = 'en-US') => {
  return listing.map((item) => {
    const dateRelease = item.release_date ? item.release_date : item.first_air_date; // for movie or tv
    return {
      id: item.id,
      title: item.title ? item.title : item.name,
      overview: truncateOverview(item.overview, 185),
      backdrop: item.backdrop_path
        ? BACKDROP_780 + item.backdrop_path
        : BACKDROP_NOT_IMAGE,
      vote: {
        count: item.vote_average.toFixed(1),
        class: getClassByRate(item.vote_average),
      },
      date: new Date(dateRelease).toLocaleDateString(language, OPTIONS_DATE),
      status: checkStatus(dateRelease),
    };
  });
};

const viewsForCardPerson = (listing, language = 'en-US') => {
  return listing.map((item) => {
    return {
      id: item.id,
      gender: item.gender === 1 ? 'Female' : 'Male',
      name: item.name,
      avatar: item.profile_path ? AVATAR_185 + item.profile_path : AVATAR_NOT_IMAGE,
      known_for_department: item.known_for_department,
      type: 'person',
      known_for: viewsForCardMovie(item.known_for, 'movie', language),
    };
  });
};

const viewsForCardMovie = (listing, media_type = 'movie', language = 'en-US') => {
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

const viewsForCreditsCast = (listing) => {
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

const viewsForProviders = (listing) => {
  return listing.map((item) => {
    return {
      id: item.provider_id,
      name: item.provider_name,
      logo: item.logo_path ? LOGO_45 + item.logo_path : LOGO_NOT_IMAGE,
    };
  });
};

const viewForDetail = (detail, type, language) => {
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
      (item) =>
        item.job === 'Story' || item.job === 'Director' || item.job === 'Screenplay'
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
    const findTranslation = detail.translations.translations.find(
      (item) => item.iso_3166_1 === 'US'
    );
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
    backdrop: detail.backdrop_path
      ? BACKDROP_780 + detail.backdrop_path
      : BACKDROP_NOT_IMAGE,
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
    director:
      type === 'movie'
        ? getProduction().find((item) => item.job.includes('Director'))
        : null, // only movie
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

const viewForPerson = (person, language = 'en-US') => {
  const getAge = (dateString) => {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
  };

  const searchBiography = (person, lg) => {
    if (person.biography) return person.biography;
    const founded = person.translations.translations.find(
      (item) => item.iso_639_1 === lg.slice(0, 2)
    );
    if (founded) {
      return founded.data.biography;
    } else {
      const foundedUS = person.translations.translations.find(
        (item) => item.iso_3166_1 === 'US'
      );
      return foundedUS ? foundedUS.data.biography : '';
    }
  };

  const notAvatar = person.gender === 1 ? AVATAR_NOT_IMAGE_WOMAN : AVATAR_NOT_IMAGE_MAN;

  return {
    id: person.id,
    name: person.name,
    biography: searchBiography(person, language),
    gender: person.gender === 1 ? 'Female' : 'Male',
    birthday: person.birthday && person.birthday + ` (${getAge(person.birthday)} years)`, //TODO: change by language
    place_of_birth: person.place_of_birth,
    deathday: person.deathday,
    avatar: person.profile_path ? AVATAR_632 + person.profile_path : notAvatar,
    known_for: person.known_for_department,
    urlImdb: person.imdb_id && `https://www.imdb.com/name/${person.imdb_id}/`,
    also_known_as: person.also_known_as,
  };
};

const viewsForCreditPerson = (credits) => {
  return credits
    .map((item) => {
      return {
        id: item.id,
        credit_id: item.credit_id,
        title: item.title || item.name,
        character: item.character,
        date: item.release_date || item.first_air_date || '-',
        episodes: item.episode_count || null,
        media_type: item.media_type,
        department: item.department,
        job: item.job,
      };
    })
    .sort(sortByDate);
};

const viewsForSocialLinks = (links) => {
  return links
    ? {
        imdb: links.imdb_id && `https://www.imdb.com/name/${links.imdb_id}/`,
        facebook: links.facebook_id && `https://facebook.com/${links.facebook_id}`,
        instagram: links.instagram_id && `https://instagram.com/${links.instagram_id}`,
        twitter: links.twitter_id && `https://twitter.com/${links.twitter_id}`,
      }
    : {};
};

const viewsForReviews = (listing, language) => {
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

const viewsForProvidersMovies = (listing, region) => {
  return {
    buy: viewsForProviders(listing[region]?.buy || []),
    flatrate: viewsForProviders(listing[region]?.flatrate || []),
    rent: viewsForProviders(listing[region]?.rent || []),
  };
};

export {
  viewsForBannerCarousel,
  viewsForCardMovie,
  viewsForCreditsCast,
  viewsForProviders,
  viewForDetail,
  viewForPerson,
  viewsForCardPerson,
  viewsForCreditPerson,
  viewsForSocialLinks,
  viewsForReviews,
  viewsForProvidersMovies,
};
