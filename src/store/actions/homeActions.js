import axiosMod from 'services/axiosMod';
import { adapterBannerCarousel, adapterCardMovie } from 'adapter';

async function getHome(region = 'US', language = 'en-US') {
  try {
    const [nowPlaying, populars, trending, airingToday] = await Promise.all([
      await axiosMod('/movie/now_playing?', { language, region }),
      await axiosMod('/movie/popular?', { language, region }),
      await axiosMod(`/trending/tv/day?`), // types: all, tv, movie, person
      await axiosMod('/tv/on_the_air?', { language }),
    ]);

    return {
      nowPlaying: adapterBannerCarousel(nowPlaying.data.results.slice(0, 6), language), // return only 6 items
      populars: adapterCardMovie(populars.data.results.slice(0, 12), 'movie', language), // return only 12 items
      trending: adapterCardMovie(trending.data.results.slice(0, 6)), // return only 12 items
      airingToday: adapterBannerCarousel(airingToday.data.results.slice(0, 6), language),
    };
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

// for carousel
async function getNowPlaying(limit = 8, page = 1, region = 'US', language = 'en-US') {
  try {
    const { data } = await axiosMod('/movie/now_playing?', { language, page, region });
    if (data) {
      const response = limit ? data.results.slice(0, limit) : data.results;
      return adapterBannerCarousel(response, language);
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
      return adapterCardMovie(response, 'movie', language);
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
      return adapterCardMovie(response); // api only return language english
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
      return adapterBannerCarousel(results, language);
    }
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
}

export { getNowPlaying, getPopulars, getTrending, getAiringToday, getHome };
