import { render, screen } from '@testing-library/react';
import HistoryPage from '../history/index';

describe('History Page', () => {
  it('renders the page title', () => {
    render(<HistoryPage />);
    const titleElement = screen.getByText(/History Page/i);
    expect(titleElement).toBeInTheDocument();
  });
});
