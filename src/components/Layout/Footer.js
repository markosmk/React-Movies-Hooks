import { Link } from 'react-router-dom';

function LinkFooter({ path, name }) {
  return (
    <li>
      <Link
        to={path}
        className="text-slate-400 text-sm leading-7 hover:text-cyan-500 transition-colors"
      >
        {name}
      </Link>
    </li>
  );
}

function Footer() {
  const urls = {
    general: [
      { path: '/', name: 'Home' },
      { path: '/faq', name: 'Faq' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' },
    ],
    providers: [
      { path: '/movies?providers=8', name: 'Netflix' },
      { path: '/movies?providers=119', name: 'Amazon Prime' },
      { path: '/movies?providers=2', name: 'Apple ITunes' },
      { path: '/movies?providers=337', name: 'Disney Plus' },
    ],
    genres: [
      { path: '/genre/28', name: 'Action' },
      { path: '/genre/12', name: 'Adventure' },
      { path: '/genre/18', name: 'Drama' },
      { path: '/genre/878', name: 'Science Fiction' },
    ],
    aditional: [
      { path: '/upcoming', name: 'Upcoming' },
      { path: '/movies', name: 'Discover Movies' },
      { path: '/tv', name: 'Tv Shows' },
    ],
  };

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
                {urls['general'].map((item, idx) => (
                  <LinkFooter {...item} key={idx} />
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold">Providers</h5>
              <ul className="mt-4">
                {urls['providers'].map((item, idx) => (
                  <LinkFooter {...item} key={idx} />
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold">Genres</h5>
              <ul className="mt-4">
                {urls['genres'].map((item, idx) => (
                  <LinkFooter {...item} key={idx} />
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold">Sections</h5>
              <ul className="mt-4">
                {urls['aditional'].map((item, idx) => (
                  <LinkFooter {...item} key={idx} />
                ))}
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
              className="text-white hover:text-cyan-500 transition-colors"
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
              className="text-white hover:text-cyan-500 transition-colors"
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
