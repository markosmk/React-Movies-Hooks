import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="mt-12 sm:mt-24 pt-12 sm:pt-24 pb-3 bg-black">
      <div className="container">
        <h4 className="mb-4 text-xl sm:text-2xl text-slate-100  font-light leading-10">
          Every single day our service is used by millions of people while we process over
          3 billion requests. We've proven for years that this is a service that can be
          trusted and relied on.
        </h4>
        <div className="pt-14 mt-14 border-t border-slate-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h5 className="text-slate-100 font-semibold">General</h5>
              <ul className="mt-4">
                <li>
                  <Link to="/" className="text-slate-400 text-sm leading-7">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-slate-400 text-sm leading-7">
                    Faq
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-400 text-sm leading-7">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 text-sm leading-7">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold">Providers</h5>
              <ul className="mt-4">
                <li>
                  <Link
                    to="/movies?providers=8"
                    className="text-slate-400 text-sm leading-7"
                  >
                    NetFlix
                  </Link>
                </li>
                <li>
                  <Link
                    to="/movies?providers=119"
                    className="text-slate-400 text-sm leading-7"
                  >
                    Amazon Prime
                  </Link>
                </li>
                <li>
                  <Link
                    to="/movies?providers=2"
                    className="text-slate-400 text-sm leading-7"
                  >
                    Apple ITunes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/movies?providers=337"
                    className="text-slate-400 text-sm leading-7"
                  >
                    Disney Plus
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold">Genres</h5>
              <ul className="mt-4">
                <li>
                  <Link to="/genre/28" className="text-slate-400 text-sm leading-7">
                    Action
                  </Link>
                </li>
                <li>
                  <Link to="/genre/12" className="text-slate-400 text-sm leading-7">
                    Adventure
                  </Link>
                </li>
                <li>
                  <Link to="/genre/18" className="text-slate-400 text-sm leading-7">
                    Drama
                  </Link>
                </li>
                <li>
                  <Link to="/genre/878" className="text-slate-400 text-sm leading-7">
                    Science Fiction
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold">Sections</h5>
              <ul className="mt-4">
                <li>
                  <Link to="/upcoming" className="text-slate-400 text-sm leading-7">
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="text-slate-400 text-sm leading-7">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/tv" className="text-slate-400 text-sm leading-7">
                    Tv Shows
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row items-center justify-between pt-12 pb-8">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} copyright. Develop by{' '}
            <a
              href="https://markosmk.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-cyan-500"
            >
              markosmk
            </a>
          </p>
          <p className="text-slate-400 text-sm">
            Database API used{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-cyan-500"
            >
              TheMovieDb.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
