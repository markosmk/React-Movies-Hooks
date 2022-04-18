import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import useDarkMode from 'hooks/useDarkMode';

function SwitchTheme(props) {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="flex" {...props}>
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        className={`
relative inline-flex flex-shrink-0 h-[36px] w-[36px] border-2 border-transparent rounded-full cursor-pointer transition-all ease-in-out duration-200 overflow-hidden`}
      >
        <span
          aria-hidden="true"
          className={`${darkMode ? 'scale-0' : 'scale-100'}
  pointer-events-none absolute rounded-full bg-transparent transform transition ease-in-out duration-200 text-white`}
        >
          <MoonIcon className="h-8 w-8 text-slate-400" />
        </span>
        <span
          aria-hidden="true"
          className={`${darkMode ? 'scale-100' : 'scale-0'}
  pointer-events-none absolute rounded-full bg-transparent transform transition ease-in-out duration-200 text-white`}
        >
          <SunIcon className="h-8 w-8 text-yellow-500" />
        </span>
      </Switch>
    </div>
  );
}

export default SwitchTheme;
