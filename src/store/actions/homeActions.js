import axiosMod from 'services/axiosMod';
import { viewsForBannerCarousel, viewsForCardMovie } from 'services/formatData';

// for carousel
async function getNowPlaying(limit = 8, page = 1, region = 'US', language = 'en-US') {
  try {
    const { data } = await axiosMod('/movie/now_playing?', { language, page, region });
    if (data) {
      const response = limit ? data.results.slice(0, limit) : data.results;
      return viewsForBannerCarousel(response, language);
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

async function getPopulars(limit = false, page = 1, region = 'US', language = 'en-US') {
  try {
    const { data } = await axiosMod('/movie/popular?', { language, page, region });
    if (data) {
      const response = limit ? data.results.slice(0, limit) : data.results;
      return viewsForCardMovie(response, 'movie', language);
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

async function getTrending(limit = 8, type = 'tv') {
  // types: all, tv, movie, person
  try {
    const { data } = await axiosMod(`/trending/${type}/day?`);
    if (data) {
      const response = limit ? data.results.slice(0, limit) : data.results;
      return viewsForCardMovie(response); // api only return language english
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

async function getAiringToday(limit = false, page = 1, language = 'en-US') {
  try {
    const { data } = await axiosMod('/tv/on_the_air?', { language, page });
    if (data) {
      const results = limit ? data.results.slice(0, limit) : data.results;
      return viewsForBannerCarousel(results, language);
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

export { getNowPlaying, getPopulars, getTrending, getAiringToday };
