import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import ArticlePage from '../articles/index';

jest.mock('@tanstack/react-query');

describe('ArticlePage', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [{ title: 'Article 1' }, { title: 'Article 2' }, { title: 'Article 3' }],
      isFetching: false,
    });
  });

  it('renders the page title', () => {
    render(<ArticlePage />);
    const titleElement = screen.getByText(/Article Page/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders three article cards', () => {
    render(<ArticlePage />);
    const cardElements = screen.getAllByRole('article');
    expect(cardElements.length).toEqual(3);
  });

  it('displays a loading indicator while fetching data', () => {
    (useQuery as jest.Mock).mockReturnValue({ isFetching: true });
    render(<ArticlePage />);
    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
  });
});
