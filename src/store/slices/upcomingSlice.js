import { getUpcoming } from 'store/actions/upcomingActions';

const upcomingSlice = (set, get) => ({
  upcoming: {
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    isLoading: false,
    isError: null,
  },
  getUpcoming: async (
    page = 1, // max 1000
    limit = false, // limit results
    region = get().region,
    language = get().language
  ) => {
    try {
      set((state) => ({ upcoming: { ...state.upcoming, isLoading: true } }));
      const response = await getUpcoming(page, limit, region, language);
      if (response) {
        set((state) => ({ upcoming: { ...state.upcoming, ...response } }));
      }
    } catch (error) {
      set((state) => ({ upcoming: { ...state.upcoming, isError: error.response.data } }));
    } finally {
      set((state) => ({ upcoming: { ...state.upcoming, isLoading: false } }));
    }
  },
});

export default upcomingSlice;
