import {
  getAiringToday,
  getGenres,
  getNowPlaying,
  getPopulars,
  getTrending,
  getWatchProviders,
} from 'services/getData';

const homeSlice = (set, get) => ({
  providers: [],
  genres: [],
  nowPlaying: [],
  populars: [],
  trending: [],
  airingToday: [],
  homeLoading: false,
  homeError: null,
  getProviders: async () => {
    const providers = await getWatchProviders(get().region, get().language);
    set({ providers });
  },
  getGenres: async () => {
    const genres = await getGenres(get().language);
    set({ genres });
  },
  getHome: async () => {
    const [nowPlaying, populars, trending, airingToday] = await Promise.all([
      await getNowPlaying(6, 1, get().region, get().language), // for Carousel
      await getPopulars(12, 1, get().region, get().language), // for firs list movies
      await getTrending(8),
      await getAiringToday(1, 4, get().language),
    ]);
    // set({ nowPlaying: nowPlaying });
    // set({ trending });
    // set({ populars: populars });
    // set({ airingToday: airingToday });
    set({
      nowPlaying,
      trending,
      populars,
      airingToday,
    });
  },
});

export default homeSlice;
