import { render, screen } from '@testing-library/react';
import type { NextComponentType, NextPageContext } from 'next';
import App from '../_app';

const mockRouter: any = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: async () => true,
  replace: async () => true,
  reload: () => null,
  back: () => null,
  prefetch: async () => undefined,
  beforePopState: () => null,
  events: {
    on: () => null,
    off: () => null,
    emit: () => null,
  },
  isFallback: false,
};

const MockComponent: NextComponentType<NextPageContext, any, {}> = () => {
  return <div id=".App">App Container</div>;
};

describe('App', () => {
  it('renders the app component with a query client', () => {
    render(<App Component={MockComponent} pageProps={{}} router={mockRouter} />);
    expect(screen.getByText('App Container')).toBeInTheDocument();
  });
});
