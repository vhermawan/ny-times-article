import { render } from '@testing-library/react';
import Loading from './index';

describe('Loading component', () => {
  it('does not render when isLoading is false', () => {
    const { container } = render(<Loading isLoading={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when isLoading is true', () => {
    const { getByText } = render(<Loading isLoading={true} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
