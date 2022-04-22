import { getTvShows } from 'store/actions/movietvActions';

const tvSlice = (set, get) => ({
  tv: {
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    isLoading: false,
    isError: null,
  },
  getTvSeries: async (
    page = '1', // max 1000
    limit = false, // limit results
    region = get().region,
    language = get().language
  ) => {
    try {
      set((state) => ({ tv: { ...state.tv, isLoading: true } }));
      const response = await getTvShows(page, limit, region, language);
      set((state) => ({ tv: { ...state.tv, ...response } }));
    } catch (error) {
      set((state) => ({ tv: { ...state.tv, isError: error.response.data } }));
    } finally {
      set((state) => ({ tv: { ...state.tv, isLoading: false } }));
    }
  },
});

export default tvSlice;
