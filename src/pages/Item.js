import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SpinnerItem } from '../components/Spinner';
import { IconCalendar, IconTime } from '../components/icons';
import getMovie from '../services/getMovie';
import './Item.css';

export default function Item() {
  const { imdbID } = useParams();
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovie(imdbID).then((response) => {
      setIsLoaded(true);
      if (response.error) {
        setError(response);
      } else {
        setData(response);
      }
    });
  }, [imdbID]);

  if (!isLoaded) {
    return (
      <section className="item">
        <SpinnerItem />
      </section>
    );
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <section className="item">
      <div className="item-image">
        <img src={data.Poster} alt={data.Title} />
      </div>
      <div className="item-details">
        <h4>{data.Type}</h4>
        <h2 className="overlay-color">{data.Title}</h2>
        <div className="item-meta">
          <ul>
            <li className="item-quality">
              <span>{data.Rated}</span>
              <span>4k</span>
            </li>
            <li>{data.Genre}</li>
            <li className="item-datetime">
              <span>
                <IconCalendar />
                {data.Released}
              </span>
              <span>
                <IconTime />
                {data.Runtime}
              </span>
            </li>
          </ul>
        </div>
        <div className="item-description">{data.Plot}</div>
        <p>
          <strong>Director:</strong>
          {data.Director}
        </p>
        <p>
          <strong>Writer:</strong>
          {data.Writer}
        </p>
        <p>
          <strong>Actors:</strong>
          {data.Actors}
        </p>
        <p>
          <strong>Language:</strong>
          {data.Language}
        </p>
        <p>
          <strong>Country:</strong>
          {data.Country}
        </p>
        <div className="item-score">
          <div className="item-bar" data-rating={data.imdbRating}></div>
        </div>
        <a className="btn" href="/">
          Go Back
        </a>
      </div>
    </section>
  );
}
