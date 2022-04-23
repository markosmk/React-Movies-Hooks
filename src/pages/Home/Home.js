import { useEffect, useRef } from 'react';

import Carousel from './components/Carousel';
import GenresList from './components/GenresList';
import PopulatedList from './components/PopulatedList';
import TrendingList from './components/TrendingList';
import LatestBanner from './components/LatestBanner';

import useStore from 'store';
import shallow from 'zustand/shallow';
import { getHome } from 'store/actions/homeActions';

function Home() {
  const { results: genres, isLoading: isLoadingGenres } = useStore(
    (state) => state.genres,
    shallow
  );
  const setHome = useStore((state) => state.setHome, shallow);
  const isLoadingHome = useStore((state) => state.home.isLoading, shallow);
  const { trending, airingToday, nowPlaying, populars } = useStore((state) => ({
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
      <PopulatedList listing={populars} isLoading={isLoadingHome} />
      <GenresList listing={genres} isLoading={isLoadingGenres} />
      <TrendingList listing={trending} isLoading={isLoadingHome} />
      <LatestBanner listing={airingToday} />
    </div>
  );
}

export default Home;
