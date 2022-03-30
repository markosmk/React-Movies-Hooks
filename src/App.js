import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import {
  Search,
  Home,
  Series,
  SerieDetail,
  MovieDetail,
  Movies,
  Upcoming,
  Genre,
  Person,
} from './pages';
import About from './pages/About';
import Error from './pages/Error';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv" element={<Series />} />
          <Route path="/tv/:id" element={<SerieDetail />} />
          <Route path="/genre/:id" element={<Genre />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
