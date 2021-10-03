import { useEffect, useState } from 'react';
import getSearch from '../services/getSearch';

export default function useMovies({ keyword } = { keyword: null }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      setLoading(true);
      const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'avengers';
      getSearch({ keyword: keywordToUse }).then((movs) => {
        setMovies(movs);
        setLoading(false);
        localStorage.setItem('lastKeyword', keywordToUse);
      });
    },
    [keyword]
  );
  return [loading, movies];
}
