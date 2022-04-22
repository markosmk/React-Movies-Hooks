import { getMovies } from 'store/actions/movietvActions';

const moviesSlice = (set, get) => ({
  movies: {
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    isLoading: false,
    isError: null,
  },
  getMovies: async (
    page = 1, // max 1000
    filters = { genres: [], providers: [], sort: '' },
    region = get().region, // ex, AR, CH
    language = get().language // Change Languague
  ) => {
    try {
      set((state) => ({ movies: { ...state.movies, isLoading: true } }));
      const response = await getMovies(page, filters, region, language);
      set((state) => ({ movies: { ...state.movies, ...response } }));
    } catch (error) {
      set((state) => ({ movies: { ...state.movies, isError: error.response.data } }));
    } finally {
      set((state) => ({ movies: { ...state.movies, isLoading: false } }));
    }
  },
});

export default moviesSlice;
