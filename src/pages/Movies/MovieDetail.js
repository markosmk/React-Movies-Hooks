import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BannerHead from 'components/Details/BannerHead';
import GeneralInfo from 'components/Details/GeneralInfo';
import CharactersList from 'components/Details/CharactersList';
import RelatedList from 'components/Details/RelatedList';
import { SpinnerDetailMovie } from 'components/Spinner';

import { getDetail } from 'store/actions/movietvActions';
import useStore from 'store';
import shallow from 'zustand/shallow';

function MovieDetail() {
  const language = useStore((state) => state.language, shallow);
  const region = useStore((state) => state.region, shallow);
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    let unmounted = false;
    const fechDetail = async () => {
      if (unmounted) return;
      setLoading(true);
      const data = await getDetail(id, 'movie', region, language);
      setMovie(data);
      setLoading(false);
    };
    fechDetail();
    return () => {
      unmounted = true;
    };
  }, [id, region, language]);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <SpinnerDetailMovie />
        ) : (
          <>
            <BannerHead detail={movie.detail} />

            <GeneralInfo
              detail={movie.detail}
              providers={movie.providers}
              external={movie.external_ids}
              release={movie.release_dates}
              reviews={movie.reviews}
              videos={movie.videos}
              images={movie.images}
            />
            <CharactersList credits={movie?.credits} />

            {movie.similar.length > 0 && <RelatedList listing={movie.similar} />}

            {movie.recommendations.length > 0 && (
              <RelatedList
                listing={movie.recommendations}
                title={`If you like ${movie.detail?.title}, check out...`}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default MovieDetail;
