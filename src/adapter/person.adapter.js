import { AVATAR_NOT_IMAGE_WOMAN, AVATAR_NOT_IMAGE_MAN, AVATAR_632 } from 'config';
import { sortByDate } from 'helpers';

export const adapterSocialLinks = (links) => {
  return links
    ? {
        imdb: links.imdb_id && `https://www.imdb.com/name/${links.imdb_id}/`,
        facebook: links.facebook_id && `https://facebook.com/${links.facebook_id}`,
        instagram: links.instagram_id && `https://instagram.com/${links.instagram_id}`,
        twitter: links.twitter_id && `https://twitter.com/${links.twitter_id}`,
      }
    : {};
};

export const adapterPerson = (person, language = 'en-US') => {
  const getAge = (dateString) => {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
  };

  const searchBiography = (person, lg) => {
    if (person.biography) return person.biography;
    const founded = person.translations.translations.find((item) => item.iso_639_1 === lg.slice(0, 2));
    if (founded) {
      return founded.data.biography;
    } else {
      const foundedUS = person.translations.translations.find((item) => item.iso_3166_1 === 'US');
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

export const adapterCreditPerson = (credits) => {
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
