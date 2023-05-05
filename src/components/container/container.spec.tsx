import { render } from '@testing-library/react';
import Container from './index';

describe('Container component', () => {
  it('renders its children', () => {
    const testChild = <p>Test child</p>;
    const { getByText } = render(<Container>{testChild}</Container>);
    expect(getByText('Test child')).toBeInTheDocument();
  });

  it('applies the correct class name', () => {
    const testChild = <p>Test child</p>;
    const { container } = render(<Container>{testChild}</Container>);
    expect(container.firstChild).toHaveClass('px-6');
  });
});
