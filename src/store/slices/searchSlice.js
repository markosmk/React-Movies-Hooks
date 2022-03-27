import { getSearch } from 'services/getData';

const searchSlice = (set, get) => {
  return {
    search: {
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0,
      isLoading: false,
      isError: null,
    },
    getSearchMovies: async (
      query = '',
      page = '1', // max 1000
      type = 'movie', // type = multi | movie | tv | people
      region = get().region, // is not in tv shows type, ex, AR, CH
      language = get().language // Change Languague
    ) => {
      try {
        const response = await getSearch(query, page, type, region, language);
        if (response) {
          if (response) {
            set((state) => ({ search: { ...state.search, ...response } }));
          }
        }
      } catch (error) {
        console.log(error.response.data);
        set((state) => ({ search: { ...state.search, isError: error.response.data } }));
      }
    },
  };
};

export default searchSlice;
