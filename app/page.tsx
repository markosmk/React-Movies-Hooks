'use client';

import { useEffect } from 'react';

import { useStoreApp } from '@/store';
import { getHome } from '@/store/actions/homeActions';

import { Carousel } from '@/sections/home/Carousel';
import { ListGenres } from '@/sections/home/ListGenres';
import { ListTrending } from '@/sections/home/ListTrending';
import { ListPopulated } from '@/sections/home/ListPopulated';
import { ListTvShows } from '@/sections/home/ListTvShows';

export default function Page() {
  const { results: genres, isLoading: isLoadingGenres } = useStoreApp((state) => state.genres);

  const setHome = useStoreApp((state) => state.setHome);
  const isLoadingHome = useStoreApp((state) => state.home.isLoading);
  const { trending, airingToday, nowPlaying, populars } = useStoreApp((state) => ({
    trending: state.home.trending,
    airingToday: state.home.airingToday,
    nowPlaying: state.home.nowPlaying,
    populars: state.home.populars,
  }));

  useEffect(() => {
    const fetchHome = async () => {
      const result = await getHome();
      setHome(result);
    };
    fetchHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <Carousel listing={nowPlaying} isLoading={isLoadingHome} />
      <ListPopulated listing={populars} isLoading={isLoadingHome} />
      <ListGenres listing={genres} isLoading={isLoadingGenres} />
      <ListTrending listing={trending} isLoading={isLoadingHome} />
      <ListTvShows listing={airingToday} isLoading={isLoadingHome} />
    </div>
  );
}
