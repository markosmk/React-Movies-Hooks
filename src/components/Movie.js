import './Movie.css';

export default function Movie({ Title, Year, Poster, Type, imdbID }) {
  return (
    <div className="movie-card">
      <div className="movie-card__movie-poster">
        <a href={`/item/${imdbID}`}>
          <img loading="lazy" src={Poster} alt={Title} width="270" height="405" />
        </a>
        <span className="movie-card__movie-type">{Type}</span>
      </div>
      <div className="movie-card__movie-content">
        <h3 className="movie-card__movie-title">
          <a href={`/item/${imdbID}`}>{Title}</a>
        </h3>
        <span className="movie-card__movie-year">{Year}</span>
      </div>
    </div>
  );
}
