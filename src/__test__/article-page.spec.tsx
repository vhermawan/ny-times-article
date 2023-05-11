import { render } from '@testing-library/react';
import Articles from '../pages/articles';

jest.mock('@/features/articles', () => () => <div data-testid="articles-page" />);

describe('Articles component', () => {
  it('renders the ArticlesPage component', () => {
    const { getByTestId } = render(<Articles />);
    expect(getByTestId('articles-page')).toBeInTheDocument();
  });
});
