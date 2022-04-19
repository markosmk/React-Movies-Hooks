import axiosMod from 'services/axiosMod';
import {
  viewsForCardMovie,
  viewsForProviders,
  viewForPerson,
  viewsForCreditPerson,
  viewsForSocialLinks,
} from 'services/formatData';

async function getGenres(language = 'en-US') {
  try {
    const { data } = await axiosMod('/genre/movie/list?', { language });
    if (data) return data.genres;
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

async function getWatchProviders(watch_region = 'US', language = 'en-US') {
  try {
    const { data } = await axiosMod('/watch/providers/movie?', {
      watch_region,
      language,
    });
    if (data) return viewsForProviders(data.results);
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

async function getRecomendations(ids = [], page = 1, language = 'en-US') {
  const newLimit = ids.length > 2 ? 20 : 8;
  console.log(ids);
  const getRandomId = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const movie = getRandomId(ids);
  // const tv_id = getRandomId()
  // TODO: combinar 10 movies similar y 10 recomendadas
  // /movie/{movie_id}/similar
  try {
    const { data } = await axiosMod(`/${movie.type}/${movie.id}/recommendations?`, {
      language,
      page,
    });

    if (data) {
      const { page = 1, total_pages = 0, total_results = 0, results = [] } = data;
      const resultsFiltered = newLimit ? results.slice(0, newLimit) : results;
      return {
        page,
        total_pages,
        total_results,
        results: viewsForCardMovie(resultsFiltered, 'movie', language),
      };
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
    return {
      error: error.message,
      page: 1,
      total_pages: 1,
      total_results: 0,
      results: [],
    };
  }
}

async function getPerson(id, language = 'en-US') {
  try {
    if (!id) throw new Error('No hay identificador proporcionado');

    const { data } = await axiosMod(`/person/${id}?`, {
      language,
      append_to_response: `translations,external_ids,combined_credits`,
    });

    if (!data) throw new Error('No hay resultados para mostrar');

    // del objects with same id
    const reduceItems = (listing) => {
      return listing.reduce((accu, current) => {
        return accu.find((item) => item.id === current.id) ? accu : [...accu, current];
      }, []);
    };

    const combinedByCount = reduceItems([
      ...data.combined_credits.cast,
      ...data.combined_credits.crew,
    ]);

    const response = {
      detail: viewForPerson(data, language),
      cast: viewsForCardMovie(combinedByCount.slice(0, 8), 'movie', language),
      cast_credits: viewsForCreditPerson(data.combined_credits.cast, language),
      crew_credits: viewsForCreditPerson(
        reduceItems(data.combined_credits.crew),
        language
      ),
      external_ids: viewsForSocialLinks(data.external_ids),
      translations: data.translations.translations,
    };

    return response;
  } catch (error) {
    console.log(error.message || error.response.data.message);
    // return {};
  }
}

async function fetchData(route, watch_region = 'US', language = 'en-US') {
  const data = {
    ///providers_regions: watch/providers/regions
    providers: '/watch/providers/movie',
    genre: '/genre/movie/list',
    countries: '/configuration/countries', // or http://country.io/names.json
  };
  return await axiosMod(`${data[route]}?`, {
    watch_region,
    language,
  });
}

export { getGenres, getWatchProviders, getRecomendations, getPerson, fetchData };
