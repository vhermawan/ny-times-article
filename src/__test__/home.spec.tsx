import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders the home page correctly', () => {
    render(<Home />);

    const mainHeading = screen.getByRole('heading', {
      level: 1,
      name: /find and buy article from new york times/i,
    });
    expect(mainHeading).toBeInTheDocument();

    const description = screen.getByText(/you can buy the article use your coin/i);
    expect(description).toBeInTheDocument();

    const getStartedButton = screen.getByRole('link', { name: /get started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton.getAttribute('href')).toBe('/articles');
  });
});
