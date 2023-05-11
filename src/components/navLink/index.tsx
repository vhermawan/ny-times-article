import { useRouter } from 'next/router';
import { FC } from 'react';

export type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const NavLink: FC<NavLinkProps> = ({ children, href, className }) => {
  const router = useRouter();
  const decoration =
    router.asPath === href
      ? 'underline underline-offset-1 text-blue-500 font-bold'
      : 'text-gray-900 font-semibold';

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={`${decoration} text-sm leading-6 ${className}`}>
      {children}
    </a>
  );
};

export default NavLink;
