import create from 'zustand';
import { devtools } from 'zustand/middleware';

import homeSlice from 'store/slices/homeSlice';
import moviesSlice from 'store/slices/movieSlice';
import searchSlice from 'store/slices/searchSlice';
import upcomingSlice from 'store/slices/upcomingSlice';
import tvSlice from 'store/slices/tvSlice';
import configurationSlice from 'store/slices/configurationSlice';
import authSlice from 'store/slices/authSlice';

const createRootSlice = (set, get) => ({
  ...configurationSlice(set, get),
  ...homeSlice(set, get),
  ...searchSlice(set, get),
  ...upcomingSlice(set, get),
  ...moviesSlice(set, get),
  ...tvSlice(set, get),
  ...authSlice(set, get),
});

const useStore = create(devtools(createRootSlice));

export default useStore;
