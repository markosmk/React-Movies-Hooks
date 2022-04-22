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
  Profile,
  Recomendations,
  Favorites,
  Register,
  Login,
  About,
  Error,
  Contact,
  Faq,
} from './pages';
import Layout from 'components/Layout';
import ScrollToTop from 'components/ScrollToTop';
import PrivateRoute from 'routes/PrivateRoute';
import PublicRoute from 'routes/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv" element={<Series />} />
          <Route path="/tv/:id" element={<SerieDetail />} />
          <Route path="/genre/:id" element={<Genre />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="*" element={<Error />} />
          <Route element={<PrivateRoute />}>
            <Route path="/me" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recomendations" element={<Recomendations />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
