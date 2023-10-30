'use client';

import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps extends LinkProps {
  className?: string;
  children: ReactNode;
}

export const NavLink = ({ href, children, ...props }: NavLinkProps) => {
  const pathname = usePathname();

  if (pathname === href) {
    props.className += ' active';
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
