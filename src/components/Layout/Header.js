import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';
import { MenuAlt2Icon } from '@heroicons/react/solid';

import FormSearch from 'components/FormSearch';
import MenuLinks from 'components/Layout/subComponents/MenuLinks';
import SwitchTheme from 'components/Layout/subComponents/SwitchTheme';
import MenuUser from 'components/Layout/subComponents/MenuUser';

import shallow from 'zustand/shallow';
import useStore from 'store';

function Header() {
  const user = useStore((state) => state.auth.user, shallow);
  const genres = useStore((state) => state.genres, shallow);
  const logoutUser = useStore((state) => state.logoutUser);

  const [openMobile, setOpenMobile] = useState(false);
  // const region = useStore((state) => state.region);
  // const setRegion = useStore((state) => state.setRegion);
  // const setLanguage = useStore((state) => state.setLanguage);
  // const handleChangeRegion = (e) => {
  //   setRegion(e.target.value || 'US');
  //   const languageByRegion = [
  //     { region: 'AR', language: 'es-ES' },
  //     { region: 'ES', language: 'es-ES' },
  //     { region: 'US', language: 'en-US' },
  //     { region: 'BR', language: 'pt-BR' },
  //   ];
  //   const changeLanguage = languageByRegion.find(
  //     (item) => item.region === e.target.value
  //   )?.language;
  //   setLanguage(changeLanguage);
  // };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-3 md:py-4 bg-transparent">
      <div className="container">
        <div className="flex justify-between items-center">
          {/** Navigation */}
          <div className="relative flex flex-nowrap md:flex-wrap items-center justify-start p-0 w-full md:w-2/3">
            <div className="leading-5 relative">
              <Link to="/">
                <ReactLogo className="h-6 dark:fill-slate-100" />
              </Link>
            </div>
            <button
              className={`flex md:hidden mx-2 ${
                openMobile && 'opacity-75 bg-black p-[2px] rounded-md text-white'
              } transition-all`}
              onClick={() => setOpenMobile(!openMobile)}
            >
              <MenuAlt2Icon className="h-8 w-8 " />
            </button>
            <MenuLinks
              className={`${
                openMobile
                  ? 'block absolute top-12 right-0 w-auto rounded-md shadow-lg bg-white dark:bg-slate-800 p-4 space-y-3'
                  : 'hidden ml-10'
              }  mt-1 gap-5 md:flex`}
              genres={genres}
            />
          </div>
          {/** Menu right */}
          <div className="relative flex flex-wrap items-center justify-end p-0 w-full md:w-1/3 space-x-2 lg:space-x-4">
            {/* <select name="region" onChange={handleChangeRegion}>
              <option value="AR">Argentina</option>
              <option value="US">EEUU</option>
              <option value="ES">España</option>
              <option value="BR">Brasil</option>
            </select> */}

            <FormSearch className="hidden sm:flex" />
            <SwitchTheme />
            <MenuUser user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
