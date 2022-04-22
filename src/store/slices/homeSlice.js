import { getHome } from 'store/actions/homeActions';

const homeSlice = (set, get) => ({
  home: {
    nowPlaying: [],
    populars: [],
    trending: [],
    airingToday: [],
    isLoading: true, // begin in true to false when finish load fetch
    hasError: null, // not used for show in front yet
  },
  setLoadingHome: (data) => set(({ home }) => ({ home: { ...home, isLoading: data } })),
  setHome: (data) =>
    set(({ home }) => ({ home: { ...home, ...data, isLoading: false } })),
  getHome: async () => {
    console.log('getHome in homeslice');
    try {
      const homeSections = await getHome();
      // set({ nowPlaying: nowPlaying });
      // set({ trending });
      // set({ populars: populars });
      // set({ airingToday: airingToday });
      set(({ home }) => ({
        home: {
          ...home,
          ...homeSections,
          // isLoading: false,
        },
      }));
    } catch (error) {
      console.log('Ups in Home ', error);
      set(({ home }) => ({ home: { ...home, hasError: error.message } }));
    } finally {
      set(({ home }) => ({ home: { ...home, isLoading: false } }));
    }
  },
});

export default homeSlice;
