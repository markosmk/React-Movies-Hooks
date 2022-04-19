import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage('theme-mode');
  const enabled = typeof enabledState !== 'undefined' ? enabledState : false;
  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = 'dark';
      const element = document.documentElement; //or window.document.body
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] // Only re-call effect when value changes
  );
  return [enabled, setEnabledState];
}

export default useDarkMode;
