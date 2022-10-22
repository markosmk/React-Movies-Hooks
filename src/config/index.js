/**
 * Constants Images
 */
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// for posters_sizes - available "w92","w154","w185","w342","w500","w780", "original"
export const POSTER_342 = IMAGE_BASE_URL + '/w342';
export const POSTER_NOT_IMAGE = '/assets/noposter.svg';
// for profile_sizes: "w45", "w185", "h632", "original"
export const AVATAR_45 = IMAGE_BASE_URL + '/w45';
export const AVATAR_185 = IMAGE_BASE_URL + '/w185';
export const AVATAR_632 = IMAGE_BASE_URL + '/h632';
export const AVATAR_NOT_IMAGE = '/assets/nogender0.svg';
export const AVATAR_NOT_IMAGE_WOMAN = '/assets/nogender1.svg';
export const AVATAR_NOT_IMAGE_MAN = '/assets/nogender2.svg';
// for backdrop_sizes - available "w300", "w780", "w1280", "original",
export const BACKDROP_780 = IMAGE_BASE_URL + '/w780';
export const BACKDROP_NOT_IMAGE = '/assets/nocarousel.svg';
// for logos_sizes - "w45", "w92", "w154", "w185", "w300", "w500", "original"
export const LOGO_45 = IMAGE_BASE_URL + '/w45';
export const LOGO_NOT_IMAGE = 'https://placeholder.pics/svg/45x45';
// date format
export const OPTIONS_DATE = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
