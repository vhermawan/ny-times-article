import { render } from '@testing-library/react';
import Title from './index';

describe('Title component', () => {
  it('renders text', () => {
    const testChild = 'Test child';
    const { getByText } = render(<Title title={testChild} />);
    expect(getByText('Test child')).toBeInTheDocument();
  });
});
