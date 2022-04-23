import { useEffect, useMemo, useRef, useState } from 'react';
import HeaderPage from 'components/HeaderPage';
import ListMovies from 'components/ListMovies';

import { getRecomendations } from 'store/actions/apiActions';
import useStore from 'store';
import shallow from 'zustand/shallow';

function Recomendations() {
  const favorites = useStore((state) => state.auth.favorites, shallow);
  const [recomend, setRecomend] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const selectIds = (array) =>
    array.length > 0 ? array.map((item) => ({ id: item.id, type: item.type })) : [];
  const idFavs = useMemo(() => selectIds(favorites), [favorites]);

  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (isMounted) {
        setIsLoading(true);
        const data = await getRecomendations(idFavs);
        setRecomend(data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [idFavs]);

  return (
    <div>
      <HeaderPage
        title="My Recomendations"
        description="Here are some recommendations according to the favorite movies you have added"
      />
      <div className="container">
        <ListMovies isLoading={isLoading} listing={recomend?.results || []} />
      </div>
    </div>
  );
}

export default Recomendations;
