import useMovies from '../hooks/useMovies';
import Movie from './Movie';
import { SpinnerCard } from './Spinner';

export default function ListMoviesSearch({ keyword }) {
  const [loading, movies] = useMovies({ keyword });

  // asi tengo ordenado lo que estamos obteniendo del objeto
  /*
  return movies.map(({ imdbID, Title, Year, Poster }) => (
    <Movie key={imdbID} Title={Title} Year={Year} Poster={Poster} />
  ));
  */
  /* 
  para reducir, utilizo el spread operator, y paso por prop todos 
  las propiedades del objeto, es mejor la forma anterior ya que se
  tiene mas control
  */

  //if (movies.length === 0) return <h2>No Movies to show</h2>;

  return (
    <>
      {loading ? (
        <SpinnerCard />
      ) : (
        movies.map((mov) => <Movie key={mov.imdbID} {...mov} />)
      )}
    </>
  );
}
