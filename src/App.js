import { Route, Switch } from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Pages
import Search from './pages/Search';
import Item from './pages/Item';
import About from './pages/About';
import Home from './pages/Home';
import Error from './pages/Error';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <Navbar />
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/search/:keyword" component={Search} />
            <Route path="/item/:imdbID" component={Item} />
            <Route exact path="/" component={Home} />
            <Route path="*" component={Error} />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
