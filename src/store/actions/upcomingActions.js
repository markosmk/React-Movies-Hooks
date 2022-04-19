import axiosMod from 'services/axiosMod';
import { viewsForCardMovie } from 'services/formatData';

async function getUpcoming(page = 1, limit = false, region = 'US', language = 'en-US') {
  try {
    const { data } = await axiosMod('/movie/upcoming?', { language, page, region });
    if (data) {
      const { page = 1, total_pages = 0, total_results = 0, results = [] } = data;
      const resultsFiltered = limit ? results.slice(0, limit) : results;
      return {
        page,
        total_pages,
        total_results,
        results: viewsForCardMovie(resultsFiltered, 'movie', language),
      };
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

export { getUpcoming };
