import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Create a global mock instance of ResizeObserver
global.ResizeObserver = ResizeObserverMock;

const mockFunction = {
  setMobileMenuOpen: jest.fn(),
};

describe('Header', () => {
  it('renders the Example component correctly', () => {
    render(<Header />);

    const logoElement = screen.getByAltText('icon-header');
    expect(logoElement).toBeInTheDocument();

    const articlesLink = screen.getByRole('link', { name: /articles/i });
    expect(articlesLink).toBeInTheDocument();

    const historyLink = screen.getByRole('link', { name: /history/i });
    expect(historyLink).toBeInTheDocument();

    const gatchaLink = screen.getByRole('link', { name: /gatcha/i });
    expect(gatchaLink).toBeInTheDocument();

    const accountButton = screen.getByRole('button', { name: /account/i });
    expect(accountButton).toBeInTheDocument();

    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens and closes the mobile menu correctly', () => {
    render(<Header />);

    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(mobileMenuButton);

    const mobileMenu = screen.getByRole('dialog');
    expect(mobileMenu).toBeInTheDocument();

    const closeMenuButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeMenuButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
