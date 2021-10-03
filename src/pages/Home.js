import ListMoviesSearch from '../components/ListMoviesSearch';
import SearchForm from '../components/SearchForm';
import './Home.css';

export default function Home() {
  return (
    <section>
      <div>
        <h1>Search Movies</h1>
        <SearchForm />
        <h2 className="home-result-title">Latest results</h2>
      </div>
      <div className="grid">
        <ListMoviesSearch />
      </div>
    </section>
  );
}
