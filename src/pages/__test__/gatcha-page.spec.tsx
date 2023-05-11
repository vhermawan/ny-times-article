import { render } from '@testing-library/react';
import Gatcha from '../gatcha';

jest.mock('@/features/gatcha', () => () => <div data-testid="gatcha-page" />);

describe('Gatcha component', () => {
  it('renders the GatchaPage component', () => {
    const { getByTestId } = render(<Gatcha />);
    expect(getByTestId('gatcha-page')).toBeInTheDocument();
  });
});
