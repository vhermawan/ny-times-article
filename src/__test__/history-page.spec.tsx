import { render } from '@testing-library/react';
import History from '../pages/history';

jest.mock('@/features/history', () => () => <div data-testid="history-page" />);

describe('History component', () => {
  it('renders the HistoryPage component', () => {
    const { getByTestId } = render(<History />);
    expect(getByTestId('history-page')).toBeInTheDocument();
  });
});
