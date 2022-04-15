import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import ScrollToTopBtn from 'components/ScrollToTopBtn';
import useStore from 'store';

function Layout() {
  const getGenres = useStore((state) => state.getGenres);

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  return (
    <>
      <div className="overflow-x-hidden relative flex flex-col items-stretch min-h-screen bg-white dark:bg-slate-900 dark:text-slate-100">
        <Header />
        <Outlet />
        <Footer />
        <ScrollToTopBtn />
      </div>
    </>
  );
}

export default Layout;
