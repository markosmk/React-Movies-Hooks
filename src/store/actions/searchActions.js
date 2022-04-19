import axiosMod from 'services/axiosMod';
import { viewsForCardMovie, viewsForCardPerson } from 'services/formatData';

async function getSearch(
  query = '',
  page = '1', // max 1000
  type = null, // type = multi | movie | tv | people
  region = 'US', // is not in tv shows type, ex, AR, CH
  language = 'en-US' // change Languague
) {
  const moreParams = {
    query,
    page,
    region,
    language,
    include_adult: 'false',
  };

  try {
    const [movies, tvs, people] = await Promise.all([
      await axiosMod('/search/movie?', { ...moreParams }),
      await axiosMod('/search/tv?', { ...moreParams }),
      await axiosMod('/search/person?', { ...moreParams }),
    ]);

    const response = {
      total:
        movies.data.total_results + tvs.data.total_results + people.data.total_results,
      movie: {
        page: movies.data.page,
        total_pages: movies.data.total_pages,
        total_results: movies.data.total_results,
        results: viewsForCardMovie(movies.data.results, 'movie', language),
      },
      tv: {
        page: tvs.data.page,
        total_pages: tvs.data.total_pages,
        total_results: tvs.data.total_results,
        results: viewsForCardMovie(tvs.data.results, 'tv', language),
      },
      people: {
        page: people.data.page,
        total_pages: people.data.total_pages,
        total_results: people.data.total_results,
        results: viewsForCardPerson(people.data.results, language),
      },
    };
    return response;
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

async function getSearchByPage(
  query = '',
  page = '1', // max 1000
  type = null, // type = multi | movie | tv | people
  region = 'US', // is not in tv shows type, ex, AR, CH
  language = 'en-US' // change Languague
) {
  const moreParams = {
    query,
    page,
    region,
    language,
    include_adult: 'false',
  };

  try {
    if (!type) throw new Error('required -type- data');

    const { data } = await axiosMod(`/search/${type}?`, { ...moreParams });
    const response = {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: viewsForCardMovie(data.results, type, language),
    };
    return response;
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

export { getSearch, getSearchByPage };
