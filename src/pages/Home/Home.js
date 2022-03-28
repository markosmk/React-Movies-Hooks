import { useEffect } from 'react';

import Carousel from './components/Carousel';
import GenresList from './components/GenresList';
import PopulatedList from './components/PopulatedList';
import TrendingList from './components/TrendingList';
import LatestBanner from './components/LatestBanner';

import useStore from 'store';

function Home() {
  const genres = useStore((state) => state.genres);
  const getGenres = useStore((state) => state.getGenres);
  const trending = useStore((state) => state.trending);
  const airingToday = useStore((state) => state.airingToday);
  const nowPlaying = useStore((state) => state.nowPlaying);
  const populars = useStore((state) => state.populars);
  const getHome = useStore((state) => state.getHome);

  useEffect(() => {
    getGenres?.();
    getHome?.();
  }, [getHome, getGenres]);

  return (
    <div className="container">
      <Carousel listing={nowPlaying} />
      <PopulatedList listing={populars} />
      <GenresList listing={genres} />
      <TrendingList listing={trending} />
      <LatestBanner listing={airingToday} />
    </div>
  );
}

export default Home;
