import { cloneElement, ReactElement } from 'react';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface IActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: IActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    (!shouldMatchExactHref && asPath.startsWith(String(rest.href))) ||
    asPath.startsWith(String(rest.as))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest} passHref>
      {cloneElement(children, {
        color: isActive ? 'orange.500' : 'gray.500',
      })}
    </Link>
  );
}
