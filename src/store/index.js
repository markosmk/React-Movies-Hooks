import create from 'zustand';
import { devtools } from 'zustand/middleware';

import homeSlice from './slices/homeSlice';
import moviesSlice from './slices/movieSlice';
import searchSlice from './slices/searchSlice';
import upcomingSlice from './slices/upcomingSlice';
import tvSlice from './slices/tvSlice';

const authSlice = (set, get) => {
  return {
    authenticated: false,
    user: {},
    setUser: () => set((data) => ({ user: data })),
    // getUser: () => set({ user: {} }),
  };
};

const generalSlice = (set, get) => ({
  region: 'US',
  language: 'es-ES', // es-ES, en-US, pt-BR
  setRegion: (data) => set({ region: data }),
  setLanguage: (data) => set({ language: data }),
  // theme: 'light',
  // getGenres
  // getWatchProviders
});

const createRootSlice = (set, get) => ({
  ...generalSlice(set, get),
  ...homeSlice(set, get),
  ...searchSlice(set, get),
  ...upcomingSlice(set, get),
  ...moviesSlice(set, get),
  ...tvSlice(set, get),
  // ...authSlice(set, get),
});

const useStore = create(devtools(createRootSlice));

export default useStore;
