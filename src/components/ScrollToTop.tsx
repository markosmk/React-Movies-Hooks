'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

export const ScrollToTop = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};
