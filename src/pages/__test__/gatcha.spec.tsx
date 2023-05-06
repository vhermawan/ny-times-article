import { render, screen } from '@testing-library/react';
import GatchaPage from '../gatcha/index';

describe('GatchaPage', () => {
  it('renders the page title', () => {
    render(<GatchaPage />);
    const titleElement = screen.getByText(/Gatcha Page/i);
    expect(titleElement).toBeInTheDocument();
  });
});
