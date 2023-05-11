import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import NavLink, { NavLinkProps } from './index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NavLink', () => {
  const router = {
    asPath: '/',
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(router);
  });

  const renderNavLink = (props: NavLinkProps) => {
    return render(<NavLink {...props} />);
  };

  it('renders the NavLink correctly', () => {
    const { getByText } = renderNavLink({
      children: 'Home',
      href: '/',
    });

    const linkElement = getByText('Home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('applies the correct decoration when the current path matches the href', () => {
    router.asPath = '/about';

    const { getByText } = renderNavLink({
      children: 'About',
      href: '/about',
    });

    const linkElement = getByText('About');
    expect(linkElement).toHaveClass('underline underline-offset-1 text-blue-500 font-bold');
  });

  it('applies the correct decoration when the current path does not match the href', () => {
    router.asPath = '/other';

    const { getByText } = renderNavLink({
      children: 'About',
      href: '/about',
    });

    const linkElement = getByText('About');
    expect(linkElement).toHaveClass('text-gray-900 font-semibold');
  });

  it('calls router.push when the NavLink is clicked', () => {
    const { getByText } = renderNavLink({
      children: 'Home',
      href: '/',
    });

    const linkElement = getByText('Home');
    fireEvent.click(linkElement);

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith('/');
  });
});
