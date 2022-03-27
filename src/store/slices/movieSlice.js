import { getMovies } from 'services/getData';

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
    filters = { genres: [], providers: [] },
    sort = '',
    region = get().region, // ex, AR, CH
    language = get().language // Change Languague
  ) => {
    try {
      const response = await getMovies(page, filters, sort, region, language);
      if (response) {
        if (response) {
          set((state) => ({ movies: { ...state.movies, ...response } }));
        }
      }
    } catch (error) {
      console.log(error.response.data);
      set((state) => ({ movies: { ...state.movies, isError: error.response.data } }));
    }
  },
});

export default moviesSlice;
