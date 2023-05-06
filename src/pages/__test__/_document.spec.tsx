import { render } from '@testing-library/react';
import Document from '../_document';

jest.mock('next/document', () => ({
  __esModule: true,
  Html: () => <div />,
  Head: () => <div />,
  Main: () => <div />,
  NextScript: () => <div />,
}));

describe('Document component', () => {
  it('renders without error', () => {
    const { container } = render(<Document />);
    expect(container.firstChild).not.toBeNull();
  });
});
