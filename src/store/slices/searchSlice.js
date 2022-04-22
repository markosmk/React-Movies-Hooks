import { getSearch, getSearchByPage } from 'store/actions/searchActions';

const searchSlice = (set, get) => {
  return {
    search: {
      tv: { results: [], page: 1, total_pages: 0, total_results: 0 },
      movie: { results: [], page: 1, total_pages: 0, total_results: 0 },
      person: { results: [], page: 1, total_pages: 0, total_results: 0 },
      total: 0,
      isLoading: true,
      isError: null,
    },
    getSearchMovies: async (
      query = '',
      region = get().region, // is not in tv shows type, ex, AR, CH
      language = get().language // Change Languague
    ) => {
      try {
        const response = await getSearch(query, region, language);
        set((state) => ({ search: { ...state.search, ...response, isLoading: false } }));
      } catch (error) {
        // console.log(error);
        set((state) => ({
          search: { ...state.search, isError: error.message, isLoading: false },
        }));
      }
    },

    getPageSearch: async (
      query = '',
      page = '1', // max 1000
      type = 'tv', // type = multi | movie | tv | people
      region = get().region, // is not in tv shows type, ex, AR, CH
      language = get().language // Change Languague
    ) => {
      try {
        // TODO: isError must reset before each fetch
        set((state) => ({
          search: { ...state.search, isError: null, isLoading: true },
        }));
        const response = await getSearchByPage(query, page, type, region, language);
        set((state) => ({
          search: { ...state.search, [type]: response, isLoading: false },
        }));
      } catch (error) {
        set((state) => ({
          search: { ...state.search, isError: error.message, isLoading: false },
        }));
      }
    },
  };
};

export default searchSlice;
