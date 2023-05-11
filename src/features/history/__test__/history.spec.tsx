import { render } from '@testing-library/react';
import HistoryPage from '../';

describe('HistoryPage component', () => {
  it('renders the book history', () => {
    const user = {
      totalTicket: 10,
      totalCoin: 10,
      books: {
        list: [
          {
            title: 'Sample Book',
            imageUrl: 'sample-image.jpg',
            articleUrl: 'sample-article-url',
            abstract: 'Sample abstract',
            publishDate: '2023-05-01',
            priceArticle: 10000,
          },
        ],
      },
    };
    const setDataUser = jest.fn();
    jest.spyOn(require('@/context'), 'useGlobalContext').mockReturnValue({
      user: user,
      setDataUser: setDataUser,
    });

    const { getByText } = render(<HistoryPage />);

    expect(getByText('Sample Book')).toBeInTheDocument();

    expect(getByText('Sample abstract')).toBeInTheDocument();

    expect(getByText('1 May 2023')).toBeInTheDocument();
  });
});
