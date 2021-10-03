import { useParams } from 'react-router-dom';
import ListMoviesSearch from '../components/ListMoviesSearch';
import SearchForm from '../components/SearchForm';

export default function Search() {
  const { keyword } = useParams();

  // TODO: filtrar por parametros de busqueda
  // const { search } = useLocation();
  // const query = new URLSearchParams(search);
  // const s = query.get('s') || '';
  // console.log(s);

  return (
    <section>
      <div>
        <h1>Results: {keyword}</h1>
        <SearchForm value={keyword} />
      </div>
      <div className="grid">{keyword && <ListMoviesSearch keyword={keyword} />}</div>
    </section>
  );
}
