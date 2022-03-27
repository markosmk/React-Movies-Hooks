import { getTvShows } from 'services/getData';

const tvSlice = (set, get) => ({
  tv: {
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    isLoading: false,
    isError: null,
  },
  // tvDetail: {},
  getTvSeries: async (
    page = '1', // max 1000
    limit = false, // limit results
    region = get().region,
    language = get().language
  ) => {
    try {
      set((state) => ({ tv: { ...state.tv, isLoading: true } }));
      const response = await getTvShows(page, limit, region, language);
      if (response) {
        set((state) => ({ tv: { ...state.tv, ...response } }));
      }
    } catch (error) {
      console.log(error.response.data);
      set((state) => ({ tv: { ...state.tv, isError: error.response.data } }));
    } finally {
      set((state) => ({ tv: { ...state.tv, isLoading: false } }));
    }
  },
});

export default tvSlice;
