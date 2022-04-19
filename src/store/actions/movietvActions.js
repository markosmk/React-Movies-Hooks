import axiosMod from 'services/axiosMod';
import {
  viewForDetail,
  viewsForCardMovie,
  viewsForCreditsCast,
  viewsForProvidersMovies,
  viewsForReviews,
  viewsForSocialLinks,
} from 'services/formatData';

async function getMovies(
  page = 1,
  filters = { genres: [], providers: [], sort: '' },
  watch_region = 'US',
  language = 'en-US'
) {
  const nowDate = new Date();
  const num = nowDate.setMonth(nowDate.getMonth() + 3); // add two months for release date

  const moreParams = {
    sort_by: filters.sort ? filters.sort : 'popularity.desc', // default
    'release_date.lte': num, // 0 default
    include_null_first_air_dates: 'false',
    with_watch_providers: filters.providers.length > 0 ? filters.providers.join(',') : '',
    with_genres: filters.genres.length > 0 ? filters.genres.join(',') : '',
    with_watch_monetization_types: 'flatrate',
    include_adult: 'false',
    include_video: 'false',
    'vote_average.lte': 8.7, // because some vote 10 wrong movies
  };

  try {
    const { data } = await axiosMod('/discover/movie?', {
      language,
      page,
      watch_region,
      ...moreParams,
    });

    if (data) {
      const response = {
        page: data.page,
        total_pages: data.total_pages <= 500 ? data.total_pages : 500,
        total_results: data.total_results,
        results: viewsForCardMovie(data.results, 'movie', language),
      };
      return response;
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
    return {};
  }
}

async function getTvShows(page = 1, limit = false, region = 'US', language = 'en-US') {
  try {
    const moreParams = {
      // sort_by: 'popularity.desc', // default
      'vote_average.gte': 5, // 0 default
      include_null_first_air_dates: 'false',
      with_status: '0', //  0 Planned: 1 In Production: 2 Ended: 3 Cancelled: 4 Pilot: 5
      with_type: '0', // Documentary: 0 News: 1 Miniseries: 2 Reality: 3 Scripted: 4 Talk Show: 5 Video: 6
      // with_genres:'', // string value of genre ids
      // with_networks:'', // string value of genre ids
      // combinados
      with_watch_providers: '', // A comma or pipe separated list of watch provider ID's.
      watch_region: region, // ISO 3166-1 code. Combine this filter with with_watch_providers in order to filter your results by a specific watch provider in a specific region.
      with_watch_monetization_types: 'flatrate', // flatrate, free, ads, rent, buy
    };
    const { data } = await axiosMod('/discover/tv?', {
      page,
      language,
      ...moreParams,
    });

    if (data) {
      const results = limit ? data.results.slice(0, limit) : data.results;
      return {
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
        results: viewsForCardMovie(results, 'tv', language),
      };
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
    return {};
  }
}

async function getDetail(id, type = 'movie', region = 'US', language = 'en-US') {
  try {
    if (!id) throw new Error('No hay identificador proporcionado');

    const params = {
      language,
      append_to_response: `videos,credits,similar,watch/providers,reviews,recommendations,translations,external_ids,images,${
        type === 'movie' ? 'release_dates' : 'episode_groups'
      }`,
      include_image_language: `en,null`,
    };

    const { data } = await axiosMod(`/${type}/${id}?`, params);

    if (!data) throw new Error('No hay resultados para mostrar');

    return {
      detail: viewForDetail(data, type, language),
      credits: viewsForCreditsCast(data.credits.cast),
      similar: viewsForCardMovie(data.similar.results.slice(0, 8), type, language),
      recommendations: viewsForCardMovie(
        data.recommendations.results.slice(0, 8),
        type,
        language
      ),
      providers: viewsForProvidersMovies(data['watch/providers'].results, region),
      videos: data.videos.results.slice(0, 4),
      reviews: viewsForReviews(data.reviews.results, language), // TODO: have pagination
      images: data.images, // TODO: format url images and posters
      external_ids: viewsForSocialLinks(data.external_ids),
      release_dates: type === 'movie' ? data.release_dates.results : [],
      episode_groups: type === 'tv' ? data.episode_groups.results : [],
    };
  } catch (error) {
    console.log(error.message || error.response.data.message);
    return {};
  }
}

export { getMovies, getTvShows, getDetail };
