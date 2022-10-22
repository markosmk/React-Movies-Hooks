import { getGenres, getWatchProviders } from 'store/actions/apiActions';
import { getMovies } from 'store/actions/movietvActions';

const configurationSlice = (set, get) => ({
  region: 'AR', // US, ES, AR, BR, CL, DE, CO
  language: 'es-ES', // es-ES, en-US, pt-BR
  setRegion: (data) => set({ region: data }),
  setLanguage: (data) => set({ language: data }),
  genres: {
    results: [],
    isLoading: false,
    hasError: false,
  },
  getGenres: async () => {
    try {
      set(({ genres }) => ({ genres: { ...genres, isLoading: true } }));
      const results = await getGenres(get().language);
      if (results) {
        set(({ genres }) => ({ genres: { ...genres, results, isLoading: false } }));
      }
    } catch (error) {
      console.log(error.message);
      set(({ genres }) => ({ genres: { ...genres, hasError: error.message } }));
    }
  },
  providers: {
    results: [],
    isLoading: false,
    hasError: false,
  },
  getProviders: async () => {
    set(({ providers }) => ({ providers: { ...providers, isLoading: true } }));
    const results = await getWatchProviders(get().region, get().language);
    if (results) {
      set(({ providers }) => ({
        providers: { ...providers, isLoading: false, results },
      }));
    }
  },
  moviesByGenre: {
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    isLoading: false,
    hasError: false,
  },
  getMoviesByGenre: async (page, filters) => {
    // update only loading state
    set(({ moviesByGenre }) => ({
      moviesByGenre: { ...moviesByGenre, isLoading: true },
    }));

    const results = await getMovies(page, filters, get().region, get().language);

    // update loading state, and new list results
    set(({ moviesByGenre }) => ({
      moviesByGenre: { ...moviesByGenre, isLoading: false, ...results },
    }));
  },
});

export default configurationSlice;
