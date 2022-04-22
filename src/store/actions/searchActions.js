import axiosMod from 'services/axiosMod';
import { viewsForCardMovie, viewsForCardPerson } from 'services/formatData';

async function getSearch(
  query = '',
  region = 'US', // is not in tv shows type, ex, AR, CH
  language = 'en-US' // change Languague
) {
  const moreParams = {
    query,
    //page, //not because for default is 1
    region,
    language,
    include_adult: 'false',
  };

  try {
    const [movie, tv, person] = await Promise.all([
      await axiosMod('/search/movie?', { ...moreParams }),
      await axiosMod('/search/tv?', { ...moreParams }),
      await axiosMod('/search/person?', { ...moreParams }),
    ]);

    const response = {
      total: movie.data.total_results + tv.data.total_results + person.data.total_results,
      movie: {
        page: movie.data.page,
        total_pages: movie.data.total_pages,
        total_results: movie.data.total_results,
        results: viewsForCardMovie(movie.data.results, 'movie', language),
      },
      tv: {
        page: tv.data.page,
        total_pages: tv.data.total_pages,
        total_results: tv.data.total_results,
        results: viewsForCardMovie(tv.data.results, 'tv', language),
      },
      person: {
        page: person.data.page,
        total_pages: person.data.total_pages,
        total_results: person.data.total_results,
        results: viewsForCardPerson(person.data.results, language),
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
      results:
        type === 'person'
          ? viewsForCardPerson(data.results, language)
          : viewsForCardMovie(data.results, type, language),
    };
    return response;
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

export { getSearch, getSearchByPage };
